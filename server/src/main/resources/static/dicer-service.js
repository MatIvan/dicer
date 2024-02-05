import { LogService } from "./log-service.js"
import { NotifyService } from "./notify/notify-service.js";
import DicePack from "../entity/dice-pack.js";

/**
 * @typedef {import("./user-registry.js").User} User
 */

/**
 * @param {User} user
 * @param {string} text
 */
function info(user, text) {
	LogService.info(user, text);
	NotifyService.info(user, text);
}

/**
 * @param {User} user  
 * @param {DicePack} dicePack 
 */
function onroll(user, dicePack) {
	LogService.roll(user, dicePack);
	NotifyService.roll(user, dicePack);
}

export const DicerService = {
	onroll,
	info
};
