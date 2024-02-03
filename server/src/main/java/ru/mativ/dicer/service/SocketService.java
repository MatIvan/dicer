package ru.mativ.dicer.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import ru.mativ.dicer.dto.PayloadDto;
import ru.mativ.dicer.entity.AuthData;
import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.exception.DicerException;
import ru.mativ.dicer.exception.UserNotFoundDicerException;
import ru.mativ.dicer.service.rpc.RpcParser;
import ru.mativ.dicer.service.rpc.RpcTypes;

@Service
public class SocketService {
	private static final String S_S = "%s, %s";

	private static final Logger LOG = LoggerFactory.getLogger(SocketService.class);

	private static final String USER_ID = "userId";

	private Map<String, WebSocketSession> sessions = new HashMap<>(); // key - sessionId
	private Map<String, String> link = new HashMap<>(); // key - userId, value = sessionId

	@Autowired
	RpcParser rpcParser;

	@Autowired
	UserRegistry userRegistry;

	public User put(WebSocketSession session, AuthData authData) throws DicerException {
		String userId = userRegistry.registry(authData);
		session.getAttributes().put(USER_ID, userId);
		String sessionId = session.getId();
		sessions.put(sessionId, session);
		link.put(userId, sessionId);
		return getUser(session);
	}

	public void remove(WebSocketSession session) {
		String userId = (String) session.getAttributes().get(USER_ID);
		String sessionId = session.getId();
		sessions.remove(sessionId);
		link.remove(userId);
		userRegistry.close(userId);
	}

	public User getUser(WebSocketSession session) throws UserNotFoundDicerException {
		String userId = (String) session.getAttributes().get(USER_ID);
		return userRegistry.get(userId);
	}

	public void sendTo(String userId, RpcTypes type, Object data) {
		String sessionId = link.get(userId);
		WebSocketSession session = sessions.get(sessionId);
		PayloadDto dto = new PayloadDto(type, data);
		send(session, dto);
	}

	public void sendToAll(RpcTypes type, Object data) {
		PayloadDto dto = new PayloadDto(type, data);
		sessions.values().forEach((session) -> {
			send(session, dto);
		});
	}

	private void send(WebSocketSession session, PayloadDto payload) {
		try {
			String json = rpcParser.toJson(payload);
			LOG.debug(S_S.formatted(session.getId(), json));
			session.sendMessage(new TextMessage(json));
		} catch (Exception e) {
			LOG.error(e.getLocalizedMessage(), e);
			// TODO remove session and close user
		}
	}

}
