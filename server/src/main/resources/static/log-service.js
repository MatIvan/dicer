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
		const caption = div("log-row-dice-caption");
		caption.innerText = dicePackToString(dicePack);
		const lotok = div("log-row-dice-lotok");
		dicePack.dices.forEach(dice => {
			const itemCap = div("log-row-dice-lotok-caption");
			itemCap.innerText = dice.count.toString() + "d" + dice.face.toString();
			const itemVal = div("log-row-dice-lotok-values");
			let str = "";
			dice.values.forEach((v, i) => {
				str += v.toString();
				str += i < dice.values.length - 1 ? " | " : "";
			});
			itemVal.innerHTML = str;
			const item = div("log-row-dice-lotok-item");
			item.append(itemCap, itemVal);
			lotok.append(item);
		});

		const el = div("log-row-dice");
		el.append(caption, lotok);
		return el;
	}
}

function dicePackToString(dicePack) {
	const { dices } = dicePack;
	let sum = 0;
	let res = "";
	dices.forEach((dice, index) => {
		const { face, count, values } = dice;
		res += count.toString() + "d" + face.toString();
		res += index < dices.length - 1 ? "+" : "";
		values.forEach(v => sum += v);
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
