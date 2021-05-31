const { addPrototype } = require("erisify/helper/prototype");

/**
 * @param {import("eris")} Eris
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "Member", function hoistColor() {
        const hoistedRole = this.roles.find(item => item.hoist);

        return hoistedRole?.color || "#FFFF";
    }, true);
};