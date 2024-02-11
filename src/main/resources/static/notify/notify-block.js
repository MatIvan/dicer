import { DicePackLogRow } from "./notify-formula.js";
import { InnerText } from "./inner-text.js";
import { InnerDicePack } from "./inner-dice-pack.js";

/**
 * @typedef {import("../user-registry.js").User} User
 */

/**
 * @param {User} user 
 * @param {HTMLElement} inner 
 * @param {DicePack} dicePack 
 * @returns {HTMLElement} element
 */
function create(user, inner, dicePack) {
    if (!user) {
        user = {
            name: ">>>",
            theme: "black"
        }
    }
    const icon = $.createDiv("notify-block-icon");
    icon.style.backgroundColor = user.theme;

    const name = $.createDiv("notify-block-name");
    name.style.color = user.theme;
    name.innerText = user.name + ":";

    const cap = $.createDiv("notify-block-cap");
    cap.append(name);
    if (dicePack) {
        const formula = DicePackLogRow.create(dicePack);
        cap.append(formula);
    }
    const time = $.createDiv("notify-block-cap-time");
    time.innerText = (new Date()).toLocaleTimeString();
    cap.append($.createDiv("filler-grow"), time);

    const panel = $.createDiv("notify-block-panel");
    panel.append(cap, inner);

    const el = $.createDiv("notify-block");
    el.append(icon, panel);

    return el;
}

/**
 * @param {User} user 
 * @param {string} text 
 * @returns {HTMLElement} element
 */
function createInfo(user, text) {
    const inner = InnerText.create(text);
    return create(user, inner);
}

/**
 * @param {User} user 
 * @param {DicePack} dicePack 
 * @returns {HTMLElement} element
 */
function createDicePack(user, dicePack) {
    const inner = InnerDicePack.create(dicePack);
    return create(user, inner, dicePack);
}

export const NotifyBlock = {
    createInfo,
    createDicePack
}
