class MessageButton {
    constructor() {
        this.useful = true;

        return this;
    }
}

module.exports = Eris => {
    Eris.MessageButton = MessageButton;
};