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

import { Command } from "../commands/_Command";

export interface ICommand {
    name: string;
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