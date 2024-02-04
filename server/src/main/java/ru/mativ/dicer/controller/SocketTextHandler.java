package ru.mativ.dicer.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
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
import ru.mativ.dicer.entity.UserProps;
import ru.mativ.dicer.exception.DicerException;
import ru.mativ.dicer.exception.InternalRpcException;
import ru.mativ.dicer.exception.MethodRpcException;
import ru.mativ.dicer.exception.RpcException;
import ru.mativ.dicer.exception.UncknownRpcException;
import ru.mativ.dicer.exception.UserNotFoundDicerException;
import ru.mativ.dicer.service.SocketService;
import ru.mativ.dicer.service.rpc.RpcParser;

public class SocketTextHandler extends TextWebSocketHandler {
	private static final String S_S = "%s: %s";

	private static final Logger LOG = LoggerFactory.getLogger(SocketTextHandler.class);

	@Autowired
	RpcParser rpcParser;

	@Autowired
	RpcController rpcController;

	@Autowired
	SocketService socketService;

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) {
		LOG.debug(S_S.formatted(session.getId(), message.getPayload()));
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
		UserProps props = rpcParser.getUserProps(session);
		User user = socketService.put(session, props);
		rpcParser.setUserId(session, user.getId());
		LOG.debug(S_S.formatted(session.getId(), user));
		rpcController.onconnect(user);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		LOG.error(session.getId(), exception);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		LOG.debug(session.getId());
		User user = socketService.getUser(session);
		socketService.remove(session);
		rpcController.onclose(user);
	}

	private void process(WebSocketSession session, String payload) throws RpcException, DicerException {
		final String sessionId = session.getId();
		RpcPayload cmd = rpcParser.parseCommandPayload(payload);
		try {
			User user = socketService.getUser(session);
			Method method = getMethod(cmd);
			Class<?> dataClass = method.getParameterTypes()[1]; // 0 - User, 1 - data
			Object obj = rpcParser.parseData(cmd.getData(), dataClass);
			method.invoke(rpcController, user, obj);
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			LOG.error(sessionId, e);
			throw new MethodRpcException();
		} catch (UserNotFoundDicerException e) {
			LOG.error(sessionId, e);
			throw e;
		} catch (Exception e) {
			LOG.error(sessionId, e);
			throw new InternalRpcException();
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
