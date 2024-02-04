import { SocketService } from "./socket-service.js";
import { StorageService } from "./storage-service.js";

const DICER = {
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
	DICER.namePicker = document.querySelector("#name-picker");
	DICER.colorPicker = document.querySelector("#color-picker");
	DICER.btnRoll = document.querySelector("#btn-roll");

	const { name, theme } = StorageService.getProps();
	DICER.namePicker.value = name;
	DICER.colorPicker.value = theme;
}

function bind() {
	DICER.btnRoll.onclick = () => {
		SocketService.roll([{ faсe: 20 }, { faсe: 20 }]);
	}
	DICER.namePicker.addEventListener("blur", (e) => {
		StorageService.setName(e.target.value);
		SocketService.updateUser();
	}, false);
	DICER.colorPicker.addEventListener("change", (e) => {
		StorageService.setTheme(e.target.value);
		SocketService.updateUser();
	}, false);
}
