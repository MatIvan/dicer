import { UserRegistry } from "./user-registry.js";
import { DicerService } from "./dicer-service.js";

const COMMANDS = {
	PROPS_UPDATED(data) {
		console.log("PROPS_UPDATED: ", data);
		const { userId, props } = data;
		UserRegistry.update(userId, props);
	},
	WELLCOME(data) {
		console.log("WELLCOME: ", data);
	},
	NEW_USER(data) {
		console.log("NEW_USER: ", data);
		UserRegistry.put(data);
	},
	ROLL(data) {
		console.log("ROLL: ", data);
		const { userId, dicePack } = data;
		const user = UserRegistry.get(userId);
		DicerService.roll(user, dicePack);
	}
}

function invoke(payload) {
	console.debug("invoke: ", payload);
	const cmd = JSON.parse(payload);
	if (typeof COMMANDS[cmd.type] == "function") {
		COMMANDS[cmd.type](cmd.data);
	} else {
		console.warn("Method '" + method + "' have no implimentation.");
	}
}

export const SicketHandler = {
	invoke,
};
