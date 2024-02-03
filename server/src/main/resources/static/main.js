import SocketService from "./socket-service.js";

window.onload = () => {
	initCookies();
	SocketService.connect(() => {
		const props = JSON.parse(getCookie("dicer-props"));
		SocketService.updateProps(props);
	});

	const btnRoll = document.getElementById("btn-roll");
	btnRoll.onclick = () => {
		SocketService.roll([{ faсe: 20 }, { faсe: 20 }]);
	}
}

function initCookies() {
	document.cookie = "dicer-auth = " + JSON.stringify({ name: "dicer1" });
	document.cookie = "dicer-props = " + JSON.stringify({ theme: "black" });
	//TODO request user to enter name
};

function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : null;
}

