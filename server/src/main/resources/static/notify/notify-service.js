import DicePack from "../entity/dice-pack.js";
import { NotifyBlock } from "./notify-block.js";

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
 * @param {HTMLElement} block 
 */
function show(block) {
	DICER_UI.notifyPanel.insertBefore(block, DICER_UI.notifyPanel.firstChild);
	block.style.width = "2em";
	anim(block, 2);
}

/**
 * @param {User} user  
 * @param {string} text 
 */
function info(user, text) {
	//const inner = NotifyBlock.createInfo(user, text);
	//show(inner);
}

/**
 * @param {User} user  
 * @param {DicePack} dicePack 
 */
function roll(user, dicePack) {
	//const inner = NotifyBlock.createDicePack(user, dicePack);
	//show(inner, dicePack);
}

export const NotifyService = {
	roll,
	info
};
