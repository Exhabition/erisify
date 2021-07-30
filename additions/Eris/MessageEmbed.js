class MessageEmbed {
    constructor() {
        this.fields = [];

        return this;
    }

    setAuthor(name, icon_url, url) {
        this.author = { name, icon_url, url };

        return this;
    }

    setColor(color) {
        if (color.startsWith("#")) this.color = parseInt(color, 16);
        else this.color = color;

        return this;
    }

    setTitle(title) {
        this.title = title.toString().slice(256);

        return this;
    }

    setUrl(url) {
        this.url = url;

        return this;
    }

    setDescription(description) {
        this.description = description.toString().slice(2048);

        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url };

        return this;
    }

    setImage(url) {
        this.image = { url };

        return this;
    }

    setTimestamp(time = new Date()) {
        this.timestamp = time;

        return this;
    }

    setFooter(text, icon_url) {
        this.footer = { text: text.toString().slice(2048), icon_url };

        return this;
    }

    addField(name, value, inline = false) {
        if (this.fields.length >= 25) {
            console.warn("Limit of 25 fields exceeded, no field was added");
            return this;
        } else if (!name || !value) {
            console.warn("Both a name & value are needed, no field was addded");
            return this;
        }

        this.fields.push({ name: toString().slice(256), value: value.toString().slice(256), inline });
    }

    clearFields() {
        this.fields = [];
    }
}

module.exports.init = Eris => {
    Eris.MessageEmbed = MessageEmbed;
};