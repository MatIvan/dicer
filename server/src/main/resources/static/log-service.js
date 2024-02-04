import { DicePackLogRow } from "./ui/dice-pack-log-row.js";

const UI = {
	logPanel: document.querySelector("#log-panel"),
}

function div(className) {
	const el = document.createElement("div");
	el.className = className;
	return el;
}

function log(user, message) {
	const row = div("log-row");
	row.append(
		getUserElement(user),
		getMessageElement(message)
	);
	//UI.logPanel.append(row);
	UI.logPanel.insertBefore(row, UI.logPanel.firstChild);
}

function getUserElement(user) {
	const el = div("log-row-user");
	if (!user) {
		el.style.color = "black";
		el.innerText = ">>>";
		return el;
	}

	const icon = div("log-row-user-icon");
	icon.style.backgroundColor = user.theme;

	const name = div("log-row-user-name");
	name.style.color = user.theme;
	name.innerText = user.name + ":";

	el.append(icon, name);
	return el;
}

function getMessageElement(message) {
	const { text, dicePack } = message;
	if (text) {
		const el = div("log-row-text");
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
