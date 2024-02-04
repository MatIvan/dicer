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
	UI.logPanel.append(row);
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
		const el = div("log-row-dice");
		el.innerText = dicePackToString(dicePack);
		return el;
	}
}

function dicePackToString(dicePack) {
	const { dices } = dicePack;
	let faces = [];
	let count = [];
	let sum = 0;
	dices.forEach(dice => {
		sum += dice.value;
		const face = dice.face;
		const i = faces.indexOf(face);
		if (i < 0) {
			faces.push(face);
			count.push(1);
		} else {
			count[i]++;
		}
	});
	let res = "";
	faces.forEach((face, i) => {
		res += count[i].toString() + "d" + face.toString()
		res += i < faces.length - 1 ? "+" : "";
	});
	res += "=" + sum
	return res;
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
