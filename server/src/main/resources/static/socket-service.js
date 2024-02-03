import { SicketHandler } from "./socket-handler.js";

var ws;

function getWsUrl() {
	var loc = window.location, new_uri;
	new_uri = loc.protocol === "https:" ? "wss:" : "ws:";
	new_uri += "//" + loc.host;
	new_uri += loc.pathname + "ws";
	return new_uri;
}

function send(type, data) {
	console.debug("send", type, data);
	ws.send(JSON.stringify({ type: type, data: data }));
}

function connect(onConnect) {
	ws = new WebSocket(getWsUrl());

	ws.addEventListener("open", (event) => {
		console.debug("WS open", event);
		onConnect();
	});

	ws.addEventListener("close", (event) => {
		console.debug("WS close", event);
	});

	ws.addEventListener("error", (event, e) => {
		console.debug("WS error", event, e);
	});

	ws.addEventListener("message", (event) => {
		console.debug("WS message", event.data);
		SicketHandler.invoke(event.data);
	});
}

function updateProps(props) {
	send("props", props);
}

function roll(dices) {
	send("roll", { dices: dices });
}

/*const SocketService = {
	connect,
	updateProps,
	roll,
}*/

export const SocketService = {
	connect,
	updateProps,
	roll,
};
