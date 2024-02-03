package ru.mativ.dicer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ru.mativ.dicer.annotation.DiceControllerMethod;
import ru.mativ.dicer.entity.DicePack;
import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.entity.UserProps;
import ru.mativ.dicer.service.RollService;
import ru.mativ.dicer.service.rpc.RpcService;

@Component
public class RpcController {
	private static final String S_S = "%s, %s";

	private static final Logger LOG = LoggerFactory.getLogger(RpcController.class);

	@Autowired
	RpcService rpc;

	@Autowired
	RollService roller;

	public void onconnect(User user) {
		LOG.info(String.valueOf(user));
		rpc.wellcome(user);
		rpc.newUser(user);
	}

	@DiceControllerMethod(type = "roll")
	public void roll(User user, DicePack pack) {
		LOG.info(S_S.formatted(user, pack));
		rpc.rollToAll(user, roller.roll(pack));
	}

	@DiceControllerMethod(type = "props")
	public void props(User user, UserProps userProps) {
		LOG.info(S_S.formatted(user, userProps));
		user.setProps(userProps);
		rpc.propsUpdated(user);
	}

}
