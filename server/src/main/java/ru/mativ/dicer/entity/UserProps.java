package ru.mativ.dicer.entity;

public class UserProps {
	private String theme;

	public UserProps() {
		super();
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	@Override
	public String toString() {
		return "UserProps [theme=" + theme + "]";
	}

}
