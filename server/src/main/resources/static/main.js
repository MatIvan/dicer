import { SocketService } from "./socket-service.js";
import { StorageService } from "./storage-service.js";

window.DICER_UI = {
	namePicker: null,
	colorPicker: null,
	btnRoll: null,
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
	DICER_UI.btnRoll.onclick = () => {
		SocketService.roll([
			{
				face: 20,
				count: 2,
			},
			{
				face: 4,
				count: 1
			}
		]);
	}
	DICER_UI.namePicker.addEventListener("blur", (e) => {
		StorageService.setName(e.target.value);
		SocketService.updateUser();
	}, false);
	DICER_UI.colorPicker.addEventListener("change", (e) => {
		StorageService.setTheme(e.target.value);
		SocketService.updateUser();
	}, false);
}
