import DicePack from "../entity/dice-pack.js";
import { NotifyBlock } from "./notify-block.js";
import { InnerText } from "./inner-text.js";
import { InnerDicePack } from "./inner-dice-pack.js";

/**
 * @typedef {import("./user-registry.js").User} User
 */

function anim(block, step) {
	setTimeout(() => {
		console.log("tick");
		block.style.width = String(step) + "em";
		if (step > 12) {
			setTimeout(() => { block.remove() }, 3000);
		} else {
			anim(block, step + 1);
		}
	}, 15);
}

/**
 * @param {User} user  
 * @param {HTMLElement} inner 
 * @param {DicePack} dicePack 
 */
function show(user, inner, dicePack) {
	const block = NotifyBlock.create(user, inner, dicePack);
	DICER_UI.notifyPanel.insertBefore(block, DICER_UI.notifyPanel.firstChild);
	block.style.width = "2em";
	anim(block, 2);
}

/**
 * @param {User} user  
 * @param {string} text 
 */
function info(user, text) {
	const inner = InnerText.create(text);
	show(user, inner);
}

/**
 * @param {User} user  
 * @param {DicePack} dicePack 
 */
function roll(user, dicePack) {
	const inner = InnerDicePack.create(dicePack);
	show(user, inner, dicePack);
}

export const NotifyService = {
	roll,
	info
};
