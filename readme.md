# 🌸 erisify 🌸

🌹 uwu eris but a few extwa thingies uwu 🌹

<br>how to use?1!?

```js
const Eris = require("eris");
require("erisify")(Eris);
```

🌺 owo more advanced owo 🌺

```js
const Eris = require("eris");
require("erisify")(Eris, { disabled: ["Message.tag"] });
```

# teh thingies

| Name | Description |
| ---- | ----------- |
| `Message.guild` | Shortcute of `message.channel.guild` |
| `Member.tag` | Combines teh `Member.username` & `Member.discriminator` |
| `Member.hoistColor` | Hex color of the hoisted role of this member |
| `Role.higherThan` | Compare 2 roles and check if the current role is higher |
| `Role.isHighest` | A boolean telling you wether this role is the highest role in the guild |
| `User.tag` | Combines teh `Member.username` & `Member.discriminator` |

## MessageEmbed & MessageButton
coming soon uwu

# options yay

🏵️ `enabled` - When `enabled` contains 1 or more specific items, only those are enabled, other additions will then be disabled.
<br>[Default = `"all"`]

🏵️ `disabled` - Disabled specific additions while all other additions stay enabled
<br>[Default = `"none"`]

🏵️ `logging` - Either `true` or `false`
<br>[Default = `false`]

## examples

the following example will _only_ enable `Message.tag` and disable all other additions. Also disables logging.

```js
const Eris = require("eris");
require("erisify")(Eris, { enabled: ["Message.tag"] }, false);
```

the following example will _only_ disable `Message.tag` and enable all other additions. Also enables logging.

```js
const Eris = require("eris");
require("erisify")(Eris, { disabled: ["Message.tag"] }, true);
```

## todo
- [ ] fixy like the entire package owo
- [ ] add useful stuff

## credits
package inspired by `bsian03's` [pluris](https://github.com/bsian03/pluris) package