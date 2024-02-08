import { DicePackLogRow } from "./ui/dice-pack-log-row.js";
import { UserLogRow } from "./ui/user-log-row.js";
import { NotifyBlock } from "./notify/notify-block.js";

function log(user, message) {
	const row = $.createDiv("log-row");
	row.append(
		UserLogRow.create(user),
		getMessageElement(message)
	);
	DICER_UI.logPanel.insertBefore(row, DICER_UI.logPanel.firstChild);
}

function getMessageElement(message) {
	const { text, dicePack } = message;
	if (text) {
		const el = $.createDiv("log-row-text");
		el.innerText = text;
		return el;
	}
	if (dicePack) {
		return DicePackLogRow.create(dicePack);
	}
}

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
