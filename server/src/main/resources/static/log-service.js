import { DicePackLogRow } from "./ui/dice-pack-log-row.js";
import { UserLogRow } from "./ui/user-log-row.js";

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

function info(user, text) {
	log(user, { text });
}

function roll(user, dicePack) {
	log(user, { dicePack });
}

export const LogService = {
	roll,
	info
};
