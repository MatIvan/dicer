import { UserRegistry } from "./user-registry.js";
import { DicerService } from "./dicer-service.js";
import DicePack from "./entity/dice-pack.js";

const COMMANDS = {

	USER_UPDATED(user) {
		console.log("USER_UPDATED: ", user);
		UserRegistry.update(user);
		DicerService.info(user, "updated");
	},

	WELLCOME(data) {
		console.log("WELLCOME: ", data);
		UserRegistry.setMyId(data.userId);
		DicerService.info(null, "WELLCOME");
	},

	NEW_USER(user) {
		console.log("NEW_USER: ", user);
		UserRegistry.put(user);
		DicerService.info(user, "connected.");
	},

	REMOVE_USER(user) {
		console.log("REMOVE_USER: ", user);
		UserRegistry.remove(user);
		DicerService.info(user, "closed.");
	},

	ROLL(data) {
		console.log("ROLL: ", data);
		const { userId, dicePack } = data;
		const user = UserRegistry.get(userId);
		const pack = new DicePack(dicePack);
		DicerService.onroll(user, pack);
	}

}

function invoke(payload) {
	console.debug("invoke: ", payload);
	const cmd = JSON.parse(payload);
	if (typeof COMMANDS[cmd.type] == "function") {
		COMMANDS[cmd.type](cmd.data);
	} else {
		console.warn("Method '" + cmd.type + "' have no implimentation.");
	}
}

export const SicketHandler = {
	invoke,
};
