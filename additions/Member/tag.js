const { addPrototype } = require("erisify/helper/prototype");

/**
 * @param {import("eris")} Eris
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "Member", function tag() {
        return `${this.username}#${this.discriminator}`;
    }, true);
};