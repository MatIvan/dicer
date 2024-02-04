package ru.mativ.dicer.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.entity.UserProps;
import ru.mativ.dicer.exception.UserAuthDicerException;
import ru.mativ.dicer.exception.UserNotFoundDicerException;

@Component
public class UserRegistry {
	private static final Logger LOG = LoggerFactory.getLogger(UserRegistry.class);

	private Map<String, User> users = new HashMap<>();// key - userId

	private String generateUserId() {
		UUID uid = UUID.randomUUID();
		return uid.toString();
	}

	public User get(String userId) throws UserNotFoundDicerException {
		User user = users.get(userId);
		if (user == null) {
			throw new UserNotFoundDicerException();
		}
		return user;
	}

	public String registry(UserProps props) throws UserAuthDicerException {
		try {
			String userId = generateUserId();
			User user = new User(userId);
			user.setName(props.getName());
			user.setTheme(props.getTheme());
			users.put(userId, user);
			LOG.info(user.toString());
			return user.getId();
		} catch (Exception e) {
			LOG.warn(e.getLocalizedMessage());
			throw new UserAuthDicerException();
		}
	}

	public void close(String userId) {
		try {
			User user = get(userId);
			users.remove(user.getId());
			LOG.info(user.toString());
		} catch (UserNotFoundDicerException e) {
			LOG.warn(e.getLocalizedMessage());
		}
	}

}
