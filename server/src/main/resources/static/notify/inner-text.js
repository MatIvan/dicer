/**
 * @param {string} text 
 * @returns {HTMLElement} element
 */
function create(text) {
	const el = $.createDiv("notify-inner-text");
	el.innerText = text;
	return el;
}

export const InnerText = {
	create
}
