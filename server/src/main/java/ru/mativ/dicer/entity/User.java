package ru.mativ.dicer.entity;

public class User {
	private String id;
	private String name;
	private UserProps props;

	public User(String id, String name) {
		this.id = id;
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public UserProps getProps() {
		return props;
	}

	public void setProps(UserProps props) {
		this.props = props;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", props=" + props + "]";
	}

}
