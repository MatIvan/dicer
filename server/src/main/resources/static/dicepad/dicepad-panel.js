import DicePack from "../entity/dice-pack.js";
import { SocketService } from "../socket-service.js";

var inputVal;

/** @type {DicePack} */
var dicePack = new DicePack();

function refreshInput() {
	inputVal.innerText = dicePack.getFormula();
}

/**
 * @param {HTMLButtonElement} btn 
 */
function bindBtn(btn) {
	btn.oncontextmenu = () => {
		dicePack.appendDice(btn.value);
		refreshInput();
		return false;
	};
	btn.onclick = (e) => {
		const dp = new DicePack();
		dp.dices = [{ face: btn.value, count: 1 }];
		SocketService.roll(dp);
	}
}

function bind() {
	inputVal = document.querySelector("#dicepad-input-val");

	const btnRoll = document.querySelector("#dicepad-input-btn-roll");
	btnRoll.onclick = () => {
		if (dicePack.dices.length == 0) {
			const dp = new DicePack();
			dp.dices = [{ face: 20, count: 2 }];
			SocketService.roll(dp);
		} else {
			SocketService.roll(dicePack);
		}
		dicePack = new DicePack();
		refreshInput();
	}

	const btnClean = document.querySelector("#dicepad-input-btn-clean");
	btnClean.onclick = () => {
		dicePack = new DicePack();
		refreshInput();
	}

	const buttons = document.querySelectorAll(".dicepad-picker-btn");
	buttons.forEach(bindBtn);
}

export const Dicepad = {
	bind,
};