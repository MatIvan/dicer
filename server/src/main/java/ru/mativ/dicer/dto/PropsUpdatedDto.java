package ru.mativ.dicer.dto;

import ru.mativ.dicer.entity.UserProps;

public class PropsUpdatedDto {
	private String userId;
	private UserProps props;

	public PropsUpdatedDto() {
		super();
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public UserProps getProps() {
		return props;
	}

	public void setProps(UserProps props) {
		this.props = props;
	}

	@Override
	public String toString() {
		return "PropsUpdatedDto [userId=" + userId + ", props=" + props + "]";
	}

}
