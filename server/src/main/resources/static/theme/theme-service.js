
/** @type {HTMLInputElement} */
var switchButton;

function init() {
	switchButton = document.querySelector("#theme-switcher-input");
	switchButton.onclick = () => {
		console.log(switchButton.checked);
	}
}

export const ThemeService = {
	init,
};
