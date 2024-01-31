package ru.mativ.dicer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ru.mativ.dicer.annotation.DiceControllerMethod;
import ru.mativ.dicer.entity.DicePack;
import ru.mativ.dicer.entity.User;

@Component
public class RpcController {
	private static final Logger LOG = LoggerFactory.getLogger(RpcController.class);

	@DiceControllerMethod(type = "roll")
	public void roll(User user, DicePack dicePack) {
		LOG.info("user=%s, dices=%s".formatted(user, dicePack));
	}

}
