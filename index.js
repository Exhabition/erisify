const fs = require("fs");
const path = require("path");
const additionsPath = path.join(__dirname, ".", "additions");

/**
 * @param {import("eris")} Eris
 * @param {Object} options
 * @param {Array} [options.enabled="all"] An array of enabled additions, enabling prioritizes over disabling (ex. "Message.guild")
 * @param {Array} [options.disabled="none"] An array of disabled additions (ex. "Message.guild")
 * @param {Boolean} [options.logging=false] Enabled logging of adding additions
 */
module.exports = async (Eris, options = {}) => {
    const additionsFolders = fs.readdirSync(additionsPath);

    for (const additionFolder of additionsFolders) {
        const filePath = path.join(additionsPath, additionFolder);

        const additions = fs.readdirSync(filePath).filter(file => file.endsWith(".js"));
        for (const addition of additions) {
            if (!options.enabled?.includes(addition) && options.disabled?.includes(addition)) {
                if (options.logging) console.log(`${filePath}.${addition} has been disabled`);
                continue;
            }

            const plugin = require(`${filePath}/${addition}`);

            plugin.init(Eris);
            if (options.logging) console.log(`${filePath}.${addition} has been initialized`);
        }
    }
};