/**
 * @typedef {object} DiceGroupDto
 * @property {number} face
 * @property {number} count
 * @property {number[]} values
 */

/**
 * @param {DiceGroupDto} dto
 */
export default function DiceGroup(dto) {
    this.face = dto.face;
    this.count = dto.count;
    this.values = dto.values;

    this.getSumm = () => {
        let sum = 0;
        this.values.forEach(v => sum += v);
        return sum;
    }

    this.getFormula = () => {
        return `${this.count}d${this.face}`;
    }

}
