const { addPrototype } = require("erisify/helper/prototype");

/**
 * @param {import("eris")} Eris
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "Role", function isHighest() {
        const highestRole = Math.max.apply(Math, array.map(item => item.position));

        return highestRole.id === this.id;
    }, true);
};