import { SocketService } from "./socket-service.js";
import { StorageService } from "./storage-service.js";

const UI = {
	namePicker: null,
	colorPicker: null,
	btnRoll: null,
};

window.onload = () => {
	init();
	bind();
	SocketService.connect(() => {
		console.log("connected.");
	});
}

function init() {
	UI.namePicker = document.querySelector("#name-picker");
	UI.colorPicker = document.querySelector("#color-picker");
	UI.btnRoll = document.querySelector("#btn-roll");

	const { name, theme } = StorageService.getProps();
	UI.namePicker.value = name;
	UI.colorPicker.value = theme;
}

function bind() {
	UI.btnRoll.onclick = () => {
		SocketService.roll([{ faсe: 20 }, { faсe: 20 }]);
	}
	UI.namePicker.addEventListener("blur", (e) => {
		StorageService.setName(e.target.value);
		SocketService.updateUser();
	}, false);
	UI.colorPicker.addEventListener("change", (e) => {
		StorageService.setTheme(e.target.value);
		SocketService.updateUser();
	}, false);
}
