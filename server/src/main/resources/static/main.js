import { SocketService } from "./socket-service.js";
import { StorageService } from "./storage-service.js";
import { Dicepad } from "./dicepad/dicepad-panel.js"
import { ThemeService } from "./theme/theme-service.js"

window.DICER_UI = {
	theme: "",
	namePicker: null,
	colorPicker: null,
	logPanel: null,
	notifyPanel: null,
};

window.$ = {
	createDiv: (className) => {
		const el = document.createElement("div");
		el.className = className;
		return el;
	}
}

window.onload = () => {
	init();
	bind();
	SocketService.connect(() => {
		console.log("connected.");
		SocketService.users();
	});
}

function init() {
	ThemeService.init();

	DICER_UI.namePicker = document.querySelector("#name-picker");
	DICER_UI.colorPicker = document.querySelector("#color-picker");
	DICER_UI.logPanel = document.querySelector("#log-panel");
	DICER_UI.notifyPanel = document.querySelector("#notify-panel");
	DICER_UI.btnRoll = document.querySelector("#btn-roll");

	const { name, theme } = StorageService.getProps();
	DICER_UI.namePicker.value = name;
	DICER_UI.colorPicker.value = theme;
}

function bind() {
	Dicepad.bind();
	DICER_UI.namePicker.addEventListener("blur", (e) => {
		StorageService.setName(e.target.value);
		SocketService.updateUser();
	}, false);
	DICER_UI.colorPicker.addEventListener("change", (e) => {
		StorageService.setTheme(e.target.value);
		SocketService.updateUser();
	}, false);
}
