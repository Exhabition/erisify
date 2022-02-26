const fs = require("fs");
const path = require("path");
const additionsPath = path.join(__dirname, ".", "additions");

let erisifyOptions = { enabled: "all", disabled: "none", logging: false, preventErrors: false };

/**
 * @param {import("eris")} Eris
 * @param {Object} options
 * @param {Array} [options.enabled="all"] An array of enabled additions, enabling prioritizes over disabling (ex. ["Message.guild"])
 * @param {Array} [options.disabled="none"] An array of disabled additions (ex. ["Message.guild"])
 * @param {Boolean} [options.logging=false] Enable logging of adding additions
 * @param {Boolean} [options.preventErrors=false] Try and fix errors such as making strings shorter instead of throwing an error if the string is too long
 */
module.exports = async (Eris, options = erisifyOptions) => {
    if (options !== erisifyOptions) erisifyOptions = options;

    const additionsFolders = fs.readdirSync(additionsPath);

    for (const additionFolder of additionsFolders) {
        const filePath = path.join(additionsPath, additionFolder);

        const additions = fs.readdirSync(filePath).filter(file => file.endsWith(".js"));
        for (const addition of additions) {
            let additionName = `${additionFolder}.${addition}`;
            additionName = additionName.substring(0, additionName.length - ".js".length);

            if (!options.enabled?.includes(additionName) && options.disabled?.includes(additionName)) {
                if (options.logging) console.log(`${additionName} has been disabled`);
                continue;
            }

            const plugin = require(`${filePath}/${addition}`);

            plugin.init(Eris);
            if (options.logging) console.log(`${additionName} has been initialized`);
        }
    }
};

module.exports.options = erisifyOptions;