package ru.mativ.dicer.service.rpc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.mativ.dicer.dto.RollDto;
import ru.mativ.dicer.dto.UserDto;
import ru.mativ.dicer.dto.WellcomeDto;
import ru.mativ.dicer.entity.DicePack;
import ru.mativ.dicer.entity.User;
import ru.mativ.dicer.service.SocketService;
import ru.mativ.dicer.service.UserRegistry;

@Service
public class RpcService {
	private static final Logger LOG = LoggerFactory.getLogger(RpcService.class);

	@Autowired
	SocketService socketService;

	@Autowired
	UserRegistry userRegistry;

	public void wellcome(User user) {
		LOG.debug(String.valueOf(user));
		WellcomeDto dto = new WellcomeDto(user.getId());
		socketService.sendTo(user.getId(), RpcTypes.WELLCOME, dto);
	}

	public void userUpdated(User user) {
		LOG.debug(String.valueOf(user));
		UserDto dto = user.toDto();
		socketService.sendToAll(RpcTypes.USER_UPDATED, dto);
	}

	public void newUser(User user) {
		LOG.debug(String.valueOf(user));
		UserDto dto = user.toDto();
		socketService.sendToAll(RpcTypes.NEW_USER, dto);
	}

	public void rollToAll(User user, DicePack pack) {
		LOG.debug(String.valueOf(user));
		RollDto dto = new RollDto();
		dto.setUserId(user.getId());
		dto.setDicePack(pack);
		socketService.sendToAll(RpcTypes.ROLL, dto);
	}

	public void removeUser(User user) {
		LOG.debug(String.valueOf(user));
		UserDto dto = user.toDto();
		socketService.sendToAll(RpcTypes.REMOVE_USER, dto);
	}

	public void usersList(User user) {
		LOG.debug(String.valueOf(user));
		UserDto[] dtoArray = userRegistry.getAll().stream().map(u -> u.toDto()).toArray(UserDto[]::new);
		socketService.sendTo(user.getId(), RpcTypes.USERS, dtoArray);
	}

}
