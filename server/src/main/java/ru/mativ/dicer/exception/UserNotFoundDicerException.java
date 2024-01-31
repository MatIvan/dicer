package ru.mativ.dicer.exception;

public class UserNotFoundDicerException extends DicerException {
	private static final long serialVersionUID = 3866073237546462899L;

	public UserNotFoundDicerException() {
		super("User not found.");
	}

}
