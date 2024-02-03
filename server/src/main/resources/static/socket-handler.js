class SicketHandlerImpl {

	invoke(payload) {
		console.debug("invoke: ", payload);

		/**@type {CMD}*/
		const cmd = JSON.parse(payload);

		if (typeof this[cmd.type] == "function") {
			this[cmd.type](cmd.data);
		} else {
			LOG.debug("Method '" + method + "' have no implimentation.");
		}
	}

	PROPS_UPDATED(data) {
		console.log("PROPS_UPDATED: ", data);
		//const { userId, props } = data;
	}

	WELLCOME(data) {
		console.log("WELLCOME: ", data);
	}

	NEW_USER(data) {
		console.log("NEW_USER: ", data);
	}

	ROLL(data) {
		console.log("ROLL: ", data);
	}

}

const SicketHandler = new SicketHandlerImpl();
export default SicketHandler;
