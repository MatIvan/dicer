package ru.mativ.dicer.exception;

public class UserAuthDicerException extends DicerException {
	private static final long serialVersionUID = 7273854837072892793L;

	public UserAuthDicerException() {
		super("Auth error.");
	}

}
