const { addPrototype } = require("erisify/helper/prototype");

/**
 * @param {import("eris")} Eris
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "User", function guild() {
        return `${this.username}#${this.discriminator}`;
    }, true);
};