package ru.mativ.dicer.entity;

public class User {
	private String id;

	public User(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + "]";
	}

}
