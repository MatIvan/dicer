package ru.mativ.dicer.entity;

public class AuthData {
	private String name;

	public AuthData() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "AuthData [name=" + name + "]";
	}

}
