import DicePack from "../entity/dice-pack.js";
import { SocketService } from "../socket-service.js";

/**
 * @param {DicePack} dicePack 
 */
function createFormulaElement(dicePack) {
	const { dices } = dicePack;
	let res = dicePack.getFormula();
	const el = $.createDiv("notify-formula-content");
	el.innerText = res;
	el.title = "/roll " + res;
	el.onclick = () => {
		SocketService.roll(dices);
	}
	return el;
}

function createSeporatorElement() {
	const el = $.createDiv("notify-formula-seporator");
	el.innerText = "=";
	return el;
}

/**
 * @param {DicePack} dicePack 
 */
function createSummaElement(dicePack) {
	const el = $.createDiv("notify-formula-summa");
	el.innerText = dicePack.getSum();
	el.title = dicePack.dices.map(dice => {
		return dice.getFormula() + ": " + dice.values.join(", ");
	}).join("\r");
	return el;
}

/**
 * @param {DicePack} dicePack 
 */
function create(dicePack) {
	const el = $.createDiv("notify-formula-row");
	el.append(
		createFormulaElement(dicePack),
		createSeporatorElement(),
		createSummaElement(dicePack)
	);
	return el;
}

export const DicePackLogRow = {
	create
}