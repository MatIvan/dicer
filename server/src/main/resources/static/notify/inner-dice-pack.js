import DiceGroup from "../entity/dice-group.js";
import DicePack from "../entity/dice-pack.js";

/**
 * @param {DiceGroup} diceGroup
 * @returns {String} str 
 */
function createValuesString(diceGroup) {
	return diceGroup.values.map(v => {
		if (diceGroup.face === 20) {
			if (v === 1) {
				return `<b class="red">${v}</b>`;
			}
			if (v === 20) {
				return `<b class="green">${v}</b>`;
			}
		}
		return String(v);
	}).join(" | ");
}

/**
 * @param {DiceGroup} diceGroup
 * @returns {HTMLElement} element 
 */
function createDiceGroupWidget(diceGroup) {
	const cap = $.createDiv("notify-inner-dicepack-group-cap");
	cap.innerText = diceGroup.getFormula();
	const val = $.createDiv("notify-inner-dicepack-group-val");
	val.innerHTML = createValuesString(diceGroup);
	const el = $.createDiv("notify-inner-dicepack-group");
	el.append(cap, val);
	return el;
}

/**
 * @param {DicePack} pack 
 * @returns {HTMLElement} element
 */
function create(pack) {
	const el = $.createDiv("notify-inner-dicepack");
	pack.dices.forEach(diceGroup => {
		el.append(createDiceGroupWidget(diceGroup));
	});
	return el;
}

export const InnerDicePack = {
	create
}
