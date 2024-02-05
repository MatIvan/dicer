import DiceGroup from "./dice-group.js";

/**
 * @typedef {object} DicePackDto
 * @property {DiceGroup[]} dices
 */

/**
 * @param {DicePackDto} dto
 */
export default function DicePack(dto) {
	this.dices = dto.dices.map(diceGroupDto => new DiceGroup(diceGroupDto));

	this.getSum = () => {
		let sum = 0;
		this.dices.forEach(diceGroup => sum += diceGroup.getSumm());
		return sum;
	}

	this.getFormula = () => {
		return this.dices.map(dice => dice.getFormula()).join("+");
	}
}