const { addImport } = require("erisify/helper/prototype");

const TIMESTAMP_STYLES = {
    SHORT_TIME: "t",
    LONG_TIME: "T",
    SHORT_DATE: "d",
    LONG_DATE: "D",
    SHORT_DATE_TIME: "f",
    LONG_DATE_TIME: "F",
    RELATIVE_TIME: "R",
};

Object.freeze(TIMESTAMP_STYLES);

class Timestamp {
    constructor(options = {}) {
        this.timestamp = Date.now();
        this.style = TIMESTAMP_STYLES.SHORT_DATE_TIME;

        return this;
    }

    get() {
        return `<t:${this.timestamp}:${this.style}>`;
    }

    setStyle(style) {
        if (!style || typeof style !== "string") throw new TypeError("An invalid timestamp style was provided");
        else if (!Object.values(TIMESTAMP_STYLES).includes(style)) throw new TypeError("An invalid timestamp style was provided");

        this.style = style;

        return this;
    }

    /**
     * @param {DateConstructor} [time]
     */
    setTimestamp(time = Date.now()) {
        if (time instanceof Date) time = time.getTime();
        this.timestamp = time;

        return this;
    }
}

module.exports.init = Eris => {
    addImport(Eris, Timestamp);
    // TODO addImport(Eris, TIMESTAMP_STYLES);
};