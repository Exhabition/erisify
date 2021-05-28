const { addPrototype } = require("../../helper/prototype");

/**
 * @param {import("eris")} Eris 
 */
module.exports.init = (Eris) => {
    addPrototype(Eris, "Message", function guild() {
        return this.channel.guild || this._client.get(this.guildID);
    }, true);
}