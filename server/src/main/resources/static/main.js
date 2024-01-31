window.onload = () => {
	
	const btnRoll = document.getElementById("btn-roll");
	btnRoll.onclick=()=>{
		const msg ={
			type: "roll",
			data: {
				faces: 20,
				count: 2
			}
		}; 
		ws.send(JSON.stringify(msg));
	}
	connect();
}

var ws;

function connect() {
	ws = new WebSocket(getWsUrl());
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