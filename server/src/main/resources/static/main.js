window.onload = () => {
	connect();
}

function connect() {
	var ws = new WebSocket(getWsUrl());
	ws.addEventListener("open", (event) => {
		console.log("WS open", event);
	});
	ws.addEventListener("close", (event) => {
		console.log("WS close", event);
	});
	ws.addEventListener("error", (event,e) => {
		console.log("WS error", event,e);
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