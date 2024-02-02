package ru.mativ.dicer.entity;

public class AuthData {
	private String name;
	private String theme;

	public AuthData() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	@Override
	public String toString() {
		return "AuthData [name=" + name + ", theme=" + theme + "]";
	}

}
