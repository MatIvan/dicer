package ru.mativ.dicer.controller;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import ru.mativ.dicer.annotation.DiceControllerMethod;
import ru.mativ.dicer.entity.RpcPayload;
import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.exception.DicerException;
import ru.mativ.dicer.exception.MethodRpcException;
import ru.mativ.dicer.exception.RpcException;
import ru.mativ.dicer.exception.UncknownRpcException;
import ru.mativ.dicer.exception.UserNotFoundDicerException;
import ru.mativ.dicer.service.RpcParser;
import ru.mativ.dicer.service.UserRegistry;

public class SocketTextHandler extends TextWebSocketHandler {
	private static final Logger LOG = LoggerFactory.getLogger(SocketTextHandler.class);

	private Map<String, WebSocketSession> sessions = new HashMap<>();

	@Autowired
	RpcParser rpcParser;

	private static UserRegistry userRegistry;
    @Autowired
    public void setUserRegistry(UserRegistry userRegistry) {
    	SocketTextHandler.userRegistry = userRegistry;
    }

	@Autowired
	RpcController rpcController;

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) {
		LOG.debug(session.getId(), message);
		try {
			process(session, message.getPayload());
		} catch (DicerException | RpcException e) {
			sendError(session, e);
		} catch (Exception e) {
			sendError(session, new UncknownRpcException());
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		LOG.debug(session.getId());
		userRegistry.registry(session);
		sessions.put(session.getId(), session);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		LOG.error(session.getId(), exception);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		LOG.debug(session.getId());
		sessions.remove(session.getId());
		userRegistry.close(session);
	}

	private void process(WebSocketSession session, String payload) throws RpcException, DicerException {
		RpcPayload cmd = rpcParser.parseCommandPayload(payload);
		try {
			User user = userRegistry.get(session);
			Method method = getMethod(cmd);
			Class<?> dataClass = method.getParameterTypes()[1]; // 0 - User, 1 - data
			Object obj = rpcParser.parseData(cmd.getData(), dataClass);
			method.invoke(rpcController, user, obj);
		} catch (UserNotFoundDicerException e) {
			LOG.error(session.getId(), e);
			throw e;
		} catch (Exception e) {
			LOG.error(session.getId(), e);
			throw new MethodRpcException();
		}
	}

	private Method getMethod(RpcPayload cmd) throws MethodRpcException {
		try {
			for (final Method method : RpcController.class.getMethods()) {
				DiceControllerMethod ann = method.getAnnotation(DiceControllerMethod.class);
				if (Objects.equals(cmd.getType(), ann.type())) {
					return method;
				}
			}
		} catch (Exception e) {
			LOG.error(String.valueOf(cmd), e);
			throw new MethodRpcException();
		}
		throw new MethodRpcException();
	}

	private void sendError(WebSocketSession session, Exception diceException) {
		try {
			TextMessage message = new TextMessage(diceException.getLocalizedMessage());
			session.sendMessage(message);
		} catch (IOException e) {
			LOG.error(session.getId(), e);
		}
	}

}
