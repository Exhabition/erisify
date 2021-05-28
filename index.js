const fs = require("fs");
const path = require("path");
const additionsPath = path.join(__dirname, ".", "additions");

/**
 * @param {import("eris")} Eris
 * @param {Array} [enabled="all"]
 * @param {Array} [disabled="none"]
 */
module.exports = async (Eris, options = {}) => {
    const additionsFolders = fs.readdirSync(additionsPath);

    for (const additionFolder of additionsFolders) {
        const filePath = path.join(additionsPath, additionFolder);

        const additions = fs.readdirSync(filePath).filter(file => file.endsWith(".js"));
        for (const addition of additions) {
            const plugin = require(addition);

            plugin.init(Eris);
            console.log(`init on ${addition}`)
        }
    }
};