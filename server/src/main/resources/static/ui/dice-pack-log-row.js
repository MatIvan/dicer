import { SocketService } from "../socket-service.js";

function div(className) {
	const el = document.createElement("div");
	el.className = className;
	return el;
}

function diceStr(dice) {
	return `${dice.count}d${dice.face}`;
}

function formula(dicePack) {
	const { dices } = dicePack;
	let res = dices
		.map(diceStr)
		.join('+');
	const el = div("dice-pack-log-row-formula");
	el.innerText = res;
	el.title = "/roll " + res;
	el.onclick = () => {
		SocketService.roll(dices);
	}
	return el;
}

function seporator() {
	const el = div("dice-pack-log-row-seporator");
	el.innerText = "=";
	return el;
}

function summa(dicePack) {
	const { dices } = dicePack;
	let sum = 0;
	let title = "";
	dices.forEach(dice => {
		title += diceStr(dice) + ": ";
		dice.values.forEach(v => {
			sum += v;
			title += `${v}, `;
		});
		title += "\r";
	});
	const el = div("dice-pack-log-row-summa");
	el.innerText = sum;
	el.title = title;
	return el;
}

function create(dicePack) {
	const el = div("dice-pack-log-row");
	el.append(
		formula(dicePack),
		seporator(),
		summa(dicePack)
	);
	return el;
}

export const DicePackLogRow = {
	create
}