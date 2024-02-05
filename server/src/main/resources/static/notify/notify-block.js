
/**
 * @typedef {import("../user-registry.js").User} User
 */

/**
 * @param {User} user 
 * @param {HTMLElement} inner 
 * @returns {HTMLElement} element
 */
function create(user, inner) {
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

	const panel = $.createDiv("notify-block-panel");
	panel.append(name, inner);

	const el = $.createDiv("notify-block");
	el.append(icon, panel);

	return el;
}

export const NotifyBlock = {
	create
}
