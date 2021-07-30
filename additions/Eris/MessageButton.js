const BUTTON_STYLES = {
    blurple: 1,
    grey: 2,
    green: 3,
    red: 4,
    link: 5,
};

class MessageButton {
    constructor() {
        this.disabled = false;
        this.type = 2;

        return this;
    }

    setStyle(style) {
        if (!style || typeof style !== "string" && typeof style !== "number") throw new TypeError("An invalid button style was provided");

        if (typeof style === "number") {
            if (style > 0 && style < BUTTON_STYLES.length) this.style = style;
            else throw new TypeError(`A button style value must be higher than 0 and lower than ${BUTTON_STYLES}`);
        } else if (typeof style === "string") {
            if (BUTTON_STYLES.includes(style.toLowerCase())) this.style = BUTTON_STYLES[style.toLowerCase()];
            else throw new TypeError(`"${style}" is not a valid button style`);
        }

        return this;
    }

    setLabel(label) {
        this.label = label.toString().slice(80);

        return this;
    }

    // setEmoji(emoji) {
    //     this.emoji = { name, id, animated };

    //     return this;
    // }

    setUrl(url) {
        this.url = url;

        return this;
    }

    disable(disable = true) {
        this.disabled = disable;

        return this;
    }

    get isDisabled() {
        return this.disabled;
    }

    get isValid() {
        return true;
    }
}

module.exports.init = Eris => {
    Eris.MessageButton = MessageButton;
};