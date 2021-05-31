const { addPrototype } = require("erisify/helper/prototype");

/**
 * @param {import("eris")} Eris
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "Role", function higherThan(roleTwo) {
        // If both roles have the same position then use id's (the lower the id the older it is, so lets return true if it's older)
        if (this.position === roleTwo.position) return this.id < roleTwo.id;

        return this.position > roleTwo.position;
    }, true);
};