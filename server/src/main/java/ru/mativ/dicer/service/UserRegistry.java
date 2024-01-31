package ru.mativ.dicer.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.exception.UserNotFoundDicerException;

@Component
public class UserRegistry {
	private static final Logger LOG = LoggerFactory.getLogger(UserRegistry.class);

	private Map<String, User> users = new HashMap<>();

	public User get(WebSocketSession session) throws UserNotFoundDicerException {
		User user = users.get(session.getId());
		if (user == null) {
			throw new UserNotFoundDicerException();
		}
		return user;
	}

	public void registry(WebSocketSession session) {
		String id = session.getId();
		User user = new User(id);
		users.put(id, user);
	}

	public void close(WebSocketSession session) {
		User user;
		try {
			user = get(session);
			users.remove(user.getId());
		} catch (UserNotFoundDicerException e) {
			LOG.warn(e.getLocalizedMessage());
		}
	}

}
