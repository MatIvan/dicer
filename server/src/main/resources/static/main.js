window.onload = () => {

	initCookies();

	const btnRoll = document.getElementById("btn-roll");
	btnRoll.onclick = () => {
		const msg = {
			type: "roll",
			data: {
				dices: [{ faсe: 20 }, { faсe: 20 }]
			}
		};
		ws.send(JSON.stringify(msg));
	}
	connect();
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

var ws;

function connect() {
	ws = new WebSocket(getWsUrl());
	ws.addEventListener("open", (event) => {
		console.log("WS open", event);
		const msg = {
			type: "props",
			data: {
				theme: JSON.parse(getCookie("dicer-props")).theme
			}
		};
		ws.send(JSON.stringify(msg));
	});
	ws.addEventListener("close", (event) => {
		console.log("WS close", event);
	});
	ws.addEventListener("error", (event, e) => {
		console.log("WS error", event, e);
	});
	ws.addEventListener("message", (event) => {
		console.log("WS message", event.data);
	});
}

function getWsUrl() {
	var loc = window.location, new_uri;
	if (loc.protocol === "https:") {
		new_uri = "wss:";
	} else {
		new_uri = "ws:";
	}
	new_uri += "//" + loc.host;
	new_uri += loc.pathname + "ws";
	return new_uri;
}