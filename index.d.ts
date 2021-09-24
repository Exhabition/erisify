declare module "eris" {
  class MessageEmbed {
    setAuthor(name: string, iconUrl?: string, url?: string): this;
    setColor(color: string | number | string[]): this;
    setTitle(title: string): this;
    setURL(url: string): this;
    setDescription(description: string): this;
    setThumbnail(url: string): this;
    setImage(url: string): this;
    setTimestamp(time?: string | number | Date): this;
    setFooter(text: string, iconUrl?: string): this;
    addField(name: string | number, value: string | number | string[], inline?: boolean): this;
    clearFields(): this;
  }
}

declare function erisify(Eris: typeof import("eris")): void;

export = erisify;