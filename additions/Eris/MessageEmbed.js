const { addImport } = require("erisify/helper/prototype");
const { truncate } = require("erisify/helper/formatting");

const { preventErrors } = require("erisify/index.js").options;

/** TODO:
 * Turn values into strings when possible.
 * Stricter checking for HEX strings is
 * Take a look at `setTimestamp` again
 * Check the types of values, a boolean parameter shouldn't receive a number for example
*/

class MessageEmbed {
    /**
     * @param {Object} options
     * @param {Boolean} [options.preventErrors] [Overrides initial options of erisify] Try and fix errors such as making strings shorter instead of throwing an error if the string is too long for this specific embed
     * @param {String} [options.truncate] If a present values that are too long will get truncated and will end into the string passed in this option
    */
    constructor(options = { preventErrors }) {
        this.options = options;
        this.fields = [];

        return this;
    }

    /**
     * @param {String} name
     * @param {String} [iconUrl]
     * @param {String} [url]
     */
    setAuthor(name, iconUrl, url) {
        const tempAuthor = {};

        if (this.options.truncate || this.options.preventErrors) {
            const suffix = this.options.truncate || "";
            tempAuthor.name = truncate(name, 256, suffix);
            if (iconUrl) tempAuthor.icon_url = truncate(iconUrl, 2048, suffix);
            if (url) tempAuthor.url = truncate(url, 2048, suffix);
        } else {
            if (name.length > 0 && name.length <= 256) tempAuthor.name = name;
            else throw new RangeError("[MessageEmbed.setAuthor] 'name' must be a string longer than 0 characters and shorter than or equal to 256 characters");

            if (iconUrl) {
                if (iconUrl.length > 0 && iconUrl.length <= 2048) tempAuthor.icon_url = iconUrl;
                else throw new RangeError("[MessageEmbed.setAuthor] 'iconUrl' must be a string longer than 0 characters and shorter than or equal to 2048 characters");
            }

            if (url) {
                if (url.length > 0 && url.length <= 2048) tempAuthor.url = url;
                else throw new RangeError("[MessageEmbed.setAuthor] 'url' must be a string longer than 0 characters and shorter than or equal to 2048 characters");
            }
        }

        this.author = tempAuthor;

        return this;
    }

    /**
     * @param {Number|Array|String} color Either a HEX string, array with RGB values or number
     */
    setColor(color) {
        if (typeof color == "number") {
            if (color > 0 && color < 16777215)
                this.color = color;
            else if (!this.options.preventErrors)
                throw new RangeError("[MessageEmbed.setColor] 'color' must be a number higher than 0 and lower than or equal to 16777216777215");
        } else if (Array.isArray(color)) {
            if (color.length < 3 && !this.options.preventErrors)
                throw new RangeError("[MessageEmbed.setColor] RGB arrays must be at least 3 items long");
            else if (color.length < 3)
                return this;

            if (color.some(item => !Number.isInteger(item)) && !this.options.preventErrors)
                throw new TypeError("[MessageEmbed.setColor] RGB values must be integers");
            else if (color.some(item => !Number.isInteger(item)))
                return this;

            const [r, g, b] = color;

            this.color = parseInt(((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1), 16);
        } else if (color.startsWith("#")) {
            this.color = parseInt(color.slice(1, color.length), 16);
        } else if (!this.options.preventErrors) throw new Error("[MessageEmbed.setColor] Invalid HEX string passed as 'color'");

        return this;
    }

    /**
     * @param {String} title Prefers a string, but numbers or arrays are turned into strings too
     */
    setTitle(title) {
        if (this.options.truncate) this.title = truncate(title, 256, this.options.truncate);
        else if (this.options.preventErrors) his.title = truncate(title, 256);
        else if (title.length > 0 && title.length <= 256) this.title = title;
        else throw new RangeError("[MessageEmbed.setTitle] 'title' must be a string longer than 0 and shorter or equal to 256 characters");

        return this;
    }

    /**
     * @param {String} url
     */
    setURL(url) {
        // No clue why url limits are not documented...
        if (url.length > 0 && url.length <= 2048) this.url = url;
        else throw new RangeError("[MessageEmbed.setURL] 'url' must be a well-formed URL longer than 0 and shorter or equal to 2048 characters");

        return this;
    }

    /**
     * @param {String} description
     */
    setDescription(description) {
        if (this.options.truncate || this.options.preventErrors) this.description = truncate(description.toString(), 4096, this.options.truncate || "");
        else if (description.length > 0 && description.length <= 4096) this.description = description;
        else throw new RangeError("[MessageEmbed.setDescription] 'description' must be a string longer than 0 and shorter or equal to 4096 characters");

        return this;
    }

    /**
     * @param {String} url An url pointing to an image asset
     */
    setThumbnail(url) {
        if (url.length > 0 && url.length <= 2048) this.thumbnail = { url };
        else throw new RangeError("[MessageEmbed.setThumbnail] 'url' must be a well-formed URL longer than 0 and shorter or equal to 2048 characters");

        return this;
    }

    /**
     * @param {String} url An url pointing to an image asset
     */
    setImage(url) {
        if (url.length > 0 && url.length <= 2048) this.image = { url };
        else throw new RangeError("[MessageEmbed.setImage] 'url' must be a well-formed URL longer than 0 and shorter or equal to 2048 characters");

        return this;
    }

    /**
     * @param {DateConstructor} [time]
     */
    setTimestamp(time = new Date()) {
        if (Number.isNaN(new Date(time).getTime())) {
            if (!this.options.preventErrors) throw new Error("[MessageEmbed.setTimestamp] Invalid data passed");
            else time = new Date();
        }

        this.timestamp = new Date(time);

        return this;
    }

    /**
     * @param {String} text
     * @param {String} [iconUrl]
     */
    setFooter(text, iconUrl) {
        const tempFooter = {};

        if (this.options.truncate || this.options.preventErrors) {
            tempFooter.text = truncate(text, 2048, this.options.truncate || "");
            if (iconUrl) tempFooter.icon_url = truncate(icon_url, 2048, this.options.truncate || "");
        } else {
            if (text.length > 0 && text.length <= 2048) tempFooter.text = text;
            else throw new RangeError("[MessageEmbed.setFooter] 'text' must be a string longer than 0 characters and shorter than or equal to 2048 characters");

            if (iconUrl) {
                if (iconUrl.length > 0 && iconUrl.length <= 2048) tempFooter.icon_url = iconUrl;
                else throw new RangeError("[MessageEmbed.setFooter] 'iconUrl' must be a string longer than 0 characters and shorter than or equal to 2048 characters");
            }
        }

        this.footer = tempFooter;

        return this;
    }

    /**
     * @param {String} name
     * @param {String} value
     * @param {Boolean} [inline=true]
     */
    addField(name, value, inline = false) {
        if (Array.isArray(value)) value = value.join("\n");

        if (this.fields.length >= 25) {
            if (this.options.preventErrors) {
                console.warn("[MessageEmbed.addField] A max of 25 fields are allowed, current field couldn't be added");
                return this;
            } else {
                throw new Error("[MessageEmbed.addField] A max of 25 fields are allowed, current field would exceed limit");
            }
        }

        if (!name || !value && !this.options.preventErrors) throw new Error("[MessageEmbed.addField] both 'name' & 'value' are required");

        const tempField = { name: "Not set", value: "Not set", inline };

        if (this.options.truncate || this.options.preventErrors) {
            tempField.name = truncate(name, 256, this.options.truncate || "");
            tempField.value = truncate(value, 1024, this.options.truncate || "");
        } else {
            if (name.length > 0 && name.length <= 256) tempField.name = name;
            else throw new RangeError("[MessageEmbed.addField] 'name' must be a string longer than 0 characters and shorter than or equal 256 characters");

            if (value.length > 0 && value.length <= 1048) tempField.value = value;
            else throw new RangeError("[MessageEmbed.addField] 'value' must be a string longer than 0 characters and shorter than or equal 1048 characters");
        }

        this.fields.push(tempField);

        return this;
    }

    /**
     * @description Clears all fields
     */
    clearFields() {
        this.fields = [];

        return this;
    }
}

module.exports.init = Eris => {
    addImport(Eris, MessageEmbed);
};