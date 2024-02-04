import { LogService } from "./log-service.js"


function info(user, text) {
	LogService.info(user, text);
	//TODO popup message
}

function onroll(user, dicePack) {
	LogService.roll(user, dicePack);
	//TODO popup message and visual effects
}

export const DicerService = {
	onroll,
	info
};
