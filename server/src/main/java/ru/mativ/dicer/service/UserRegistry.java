package ru.mativ.dicer.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.exception.UserNotFoundDicerException;

@Component
public class UserRegistry {
	private static final Logger LOG = LoggerFactory.getLogger(UserRegistry.class);

	private Map<String, User> users = new HashMap<>();

	public User get(String sessionId) throws UserNotFoundDicerException {
		User user = users.get(sessionId);
		if (user == null) {
			throw new UserNotFoundDicerException();
		}
		return user;
	}

	public void registry(String sessionId) {
		User user = new User(sessionId);
		users.put(sessionId, user);
	}

	public void close(String sessionId) {
		User user;
		try {
			user = get(sessionId);
			users.remove(user.getId());
		} catch (UserNotFoundDicerException e) {
			LOG.warn(e.getLocalizedMessage());
		}
	}

}
