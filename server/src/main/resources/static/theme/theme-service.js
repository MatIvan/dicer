
/** @type {HTMLBodyElement} */
var body;

/** @type {HTMLInputElement} */
var switchButton;

function init() {
	body = document.querySelector("body");
	switchButton = document.querySelector("#theme-switcher-input");
	switchButton.onclick = () => {
		body.classList.toggle("dark");
	}
}

export const ThemeService = {
	init,
};
