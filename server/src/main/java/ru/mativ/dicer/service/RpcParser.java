package ru.mativ.dicer.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import ru.mativ.dicer.entity.RpcPayload;
import ru.mativ.dicer.exception.ParseRpcException;
import ru.mativ.dicer.exception.RpcException;

@Service
public class RpcParser {
	private static final Logger LOG = LoggerFactory.getLogger(RpcParser.class);

	public static final String DICER_AUTH = "dicer-auth";

	private static final String MSG_TYPE = "type";
	private static final String MSG_DATA = "data";
	private static final Gson GSON = new GsonBuilder().create();

	public RpcPayload parseCommandPayload(String payload) throws RpcException {
		try {
			JsonObject json = GSON.fromJson(payload, JsonObject.class);
			String type = json.get(MSG_TYPE).getAsString();
			JsonElement data = json.get(MSG_DATA);
			return new RpcPayload(type, data);
		} catch (Exception e) {
			LOG.error(payload, e);
			throw new ParseRpcException();
		}
	}

	public <T> T parseData(JsonElement data, Class<T> dataClass) throws ParseRpcException {
		try {
			return GSON.fromJson(data, dataClass);
		} catch (Exception e) {
			LOG.error(e.getLocalizedMessage(), e);
			throw new ParseRpcException();
		}
	}

	public <T> T parse(String data, Class<T> dataClass) throws ParseRpcException {
		try {
			return GSON.fromJson(data, dataClass);
		} catch (Exception e) {
			LOG.error(e.getLocalizedMessage(), e);
			throw new ParseRpcException();
		}
	}
}
