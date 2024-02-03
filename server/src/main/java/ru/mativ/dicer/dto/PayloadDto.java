package ru.mativ.dicer.dto;

import ru.mativ.dicer.service.rpc.RpcTypes;

public class PayloadDto {
	private RpcTypes type;
	private Object data;

	public PayloadDto(RpcTypes type, Object data) {
		super();
		this.type = type;
		this.data = data;
	}

	public RpcTypes getType() {
		return type;
	}

	public void setType(RpcTypes type) {
		this.type = type;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "PayloadDto [type=" + type + ", data=" + data + "]";
	}

}
