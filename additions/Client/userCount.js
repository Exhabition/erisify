const { addPrototype } = require("erisify/helper/prototype");

/**
 * @param {import("eris")} Eris
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "Client", function userCount() {
        return this.guilds?.length > 0 ? this.guilds.map(guild => guild.memberCount).reduce((total, memberCount) => total + memberCount, 0) : 0;
    }, true);
};