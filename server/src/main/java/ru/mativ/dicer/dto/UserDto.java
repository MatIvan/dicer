package ru.mativ.dicer.dto;

import ru.mativ.dicer.entity.UserProps;

public class UserDto {
	private String userId;
	private String name;
	private UserProps props;

	public UserDto() {
		super();
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UserProps getProps() {
		return props;
	}

	public void setProps(UserProps props) {
		this.props = props;
	}

	@Override
	public String toString() {
		return "UserDto [userId=" + userId + ", name=" + name + ", props=" + props + "]";
	}

}
