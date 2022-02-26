module.exports = {
    truncate: function (text, maxLength, suffix = "") {
        if (text.length > maxLength) {
            return `${text.slice(0, maxLength - suffix.length)}${suffix}`;
        }

        return text;
    },
};