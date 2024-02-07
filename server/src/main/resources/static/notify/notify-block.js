import { DicePackLogRow } from "../ui/dice-pack-log-row.js";

/**
 * @typedef {import("../user-registry.js").User} User
 */

/**
 * @param {User} user 
 * @param {HTMLElement} inner 
 * @param {DicePack} dicePack 
 * @returns {HTMLElement} element
 */
function create(user, inner, dicePack) {
	if (!user) {
		user = {
			name: ">>>",
			theme: "black"
		}
	}
	const icon = $.createDiv("notify-block-icon");
	icon.style.backgroundColor = user.theme;

	const name = $.createDiv("notify-block-name");
	name.style.color = user.theme;
	name.innerText = user.name + ":";
	const cap = $.createDiv("notify-block-cap");
	cap.append(name);
	if (dicePack) {
		const formula = DicePackLogRow.create(dicePack);
		cap.append(formula);
	}

	const panel = $.createDiv("notify-block-panel");
	panel.append(cap, inner);

	const el = $.createDiv("notify-block");
	el.append(icon, panel);

	return el;
}

export const NotifyBlock = {
	create
}
