package ru.mativ.dicer.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ru.mativ.dicer.entity.AuthData;
import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.entity.UserProps;
import ru.mativ.dicer.exception.UserAuthDicerException;
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

	public void registry(String sessionId, AuthData authData) throws UserAuthDicerException {
		try {
			User user = new User(sessionId, authData.getName());
			UserProps props = new UserProps();
			props.setTheme(authData.getTheme());
			user.setProps(props);
			users.put(sessionId, user);
			LOG.info(user.toString());
		} catch (Exception e) {
			LOG.warn(e.getLocalizedMessage());
			throw new UserAuthDicerException();
		}
	}

	public void close(String sessionId) {
		try {
			User user = get(sessionId);
			users.remove(user.getId());
			LOG.info(user.toString());
		} catch (UserNotFoundDicerException e) {
			LOG.warn(e.getLocalizedMessage());
		}
	}

}
