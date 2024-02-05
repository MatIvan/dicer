import DicePack from "../entity/dice-pack.js";
import { NotifyBlock } from "./notify-block.js";
import { InnerText } from "./inner-text.js";
import { InnerDicePack } from "./inner-dice-pack.js";

/**
 * @typedef {import("./user-registry.js").User} User
 */

/** @type {HTMLElement} */
var root;

/**
 * @param {User} user  
 * @param {HTMLElement} inner 
 */
function show(user, inner) {
	const block = NotifyBlock.create(user, inner);
	root.insertBefore(block, root.firstChild);
	/*setTimeout(() => {
		block.remove();
	}, 5000);*/
}

function init(container) {
	root = $.createDiv("notify-root");
	container.append(root);
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
	show(user, inner);
}

export const NotifyService = {
	init,
	roll,
	info
};
