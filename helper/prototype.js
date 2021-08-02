module.exports = {
    /**
     * @param {import("eris")} Eris
     * @param {String} Class
     * @param {Function} func
     * @param {Boolean} isGetter
     */
    addPrototype: function (Eris, Class, func, isGetter = false) {
        if (Eris[Class].prototype[func.name] !== undefined) return console.warn(`${func.name} already exists in ${Class}, you can't overwrite it`);

        Object.defineProperty(Eris[Class].prototype, func.name, isGetter ? { get: func } : { value: func });
    },

    /**
     * @param {import("eris")} Eris
     * @param {Class} Class
     */
    addImport: function (Eris, Class) {
        if (Eris[Class.name] !== undefined) return console.warn(`Eris.${Class.name} already exists, you can't overwrite it`);

        Object.defineProperty(Eris, Class.name, { value: Class });
    },
};