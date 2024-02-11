import DiceGroup from "./dice-group.js";

/**
 * @typedef {object} DicePackDto
 * @property {DiceGroup[]} dices
 */

/**
 * @param {DicePackDto} dto
 */
export default function DicePack(dto) {
    /** @type {DiceGroup[]} */
    this.dices = [];

    if (dto) {
        this.dices = dto.dices.map(diceGroupDto => new DiceGroup(diceGroupDto));
    }

    this.getSum = () => {
        let sum = 0;
        this.dices.forEach(diceGroup => sum += diceGroup.getSumm());
        return sum;
    }

    this.getFormula = () => {
        return this.dices.map(dice => dice.getFormula()).join("+");
    }

    this.appendDice = (face) => {
        const i = this.dices.findIndex(d => {
            return d.face === face;
        });
        if (i < 0) {
            const dg = new DiceGroup({ face, count: 1 });
            this.dices.push(dg);
            return;
        }
        this.dices[i].count++;
    }

}