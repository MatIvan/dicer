import DicePack from "../entity/dice-pack.js";

/**
 * @param {DicePack} pack 
 * @returns {HTMLElement} element
 */
function create(pack) {
	const el = $.createDiv("notify-inner-dicepack");
	el.innerText = pack.getFormula();
	return el;
}

export const InnerDicePack = {
	create
}
