package ru.mativ.dicer.entity;

import com.google.gson.JsonElement;

public class RpcPayload {
    private String type;
    private JsonElement data;

    public RpcPayload(String type, JsonElement data) {
        super();
        this.type = type;
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public JsonElement getData() {
        return data;
    }

    @Override
    public String toString() {
        return "RpcPayload [type=" + type + ", data=" + data + "]";
    }

}
