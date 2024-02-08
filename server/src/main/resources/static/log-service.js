import { NotifyBlock } from "./notify/notify-block.js";

function logBlock(block) {
	DICER_UI.logPanel.insertBefore(block, DICER_UI.logPanel.firstChild);
}

function info(user, text) {
	const block = NotifyBlock.createInfo(user, text);
	logBlock(block);
}

function roll(user, dicePack) {
	const block = NotifyBlock.createDicePack(user, dicePack);
	logBlock(block);
}

export const LogService = {
	roll,
	info
};
