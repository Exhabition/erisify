declare module "eris" {
  interface Client {
    userCount: number;
  }

  interface Member {
    hoistColor: string;
    tag: string;
  }

  interface User {
    tag: string;
  }
  
  interface Message {
    guild: Guild;
  }

  interface Role {
    higherThan(role: Role): boolean;
    isHighest: boolean;
  }

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

declare function erisify(Eris: typeof import("eris"), options?: { 
  logging: boolean;
  preventErrors: boolean;
  enabled: string[];
  disabled: string[];
}): void;

export = erisify;