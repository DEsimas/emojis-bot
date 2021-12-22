<<<<<<< HEAD
import { ImgToAscII } from "../commands/special/ImgToAscII.js";
import { DeleteEmoji } from "../commands/user/DeleteEmoji.js";
import { SetLanguage } from "../commands/user/SetLanguage.js";
import { Unsubscribe } from "../commands/user/Unsubscribe.js";
import { SetPrefix } from "../commands/admin/SetPrefix.js";
import { Subscribe } from "../commands/user/Subscribe.js";
import { DoEmojis } from "../commands/admin/DoEmojis.js";
import { Clear } from "../commands/interaction/Clear.js";
import { SetEmoji } from "../commands/user/SetEmoji.js";
import { Help } from "../commands/interaction/Help.js";
=======
import { DeleteEmoji } from "../commands/DeleteEmoji";
import { SetLanguage } from "../commands/SetLanguage";
import { Unsubscribe } from "../commands/Unsubscribe";
import { ImgToAscII } from "../commands/ImgToAscII";
import { Subscribe } from "../commands/Subscribe";
import { SetPrefix } from "../commands/SetPrefix";
import { DoEmojis } from "../commands/DoEmojis";
import { SetEmoji } from "../commands/SetEmoji";
import { Clear } from "../commands/Clear";
import { Help } from "../commands/Help";
>>>>>>> parent of c5b0847 (commands grouping)

import { Command } from "../commands/_Command.js";

export interface ICommand {
    name: "SetLanguage" | "SetEmoji" | "DeleteEmoji" | "DoEmojis" | "SetPrefix" | "ImgToAscII" | "Subscribe" | "Unsubscribe" | "Clear" | "Help";
    alias: string[];
    out: typeof Command;
};

export const commands: Array<ICommand> = [
    {
        name: "ImgToAscII",
        alias: ["imagetoacii", "imgtoascii", "ita"],
        out: ImgToAscII
    },
    {
        name: "SetEmoji",
        alias: ["setemoji", "set"],
        out: SetEmoji
    },
    {
        name: "DeleteEmoji",
        alias: ["delemoji", "del"],
        out: DeleteEmoji
    },
    {
        name: "SetLanguage",
        alias: ["setlang", "lang", "setlanguage"],
        out: SetLanguage
    },
    {
        name: "SetPrefix",
        alias: ["setprefix"],
        out: SetPrefix
    },
    {
        name: "DoEmojis",
        alias: ["doemojis"],
        out: DoEmojis
    },
    {
        name: "Subscribe",
        alias: ["subscribe", "sub"],
        out: Subscribe
    },
    {
        name: "Unsubscribe",
        alias: ["unsubscribe", "unsub"],
        out: Unsubscribe
    },
    {
        name: "Clear",
        alias: ["clear", "cls"],
        out: Clear
    },
    {
        name: "Help",
        alias: ["help", "h"],
        out: Help
    },
]