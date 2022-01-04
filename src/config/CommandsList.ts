import { ImgToAscII } from "./../commands/special/ImgToAscII";
import { DeleteEmoji } from "./../commands/user/DeleteEmoji";
import { SetLanguage } from "./../commands/user/SetLanguage";
import { Unsubscribe } from "./../commands/user/Unsubscribe";
import { SetPrefix } from "./../commands/admin/SetPrefix";
import { Subscribe } from "./../commands/user/Subscribe";
import { DoEmojis } from "./../commands/admin/DoEmojis";
import { Clear } from "./../commands/interaction/Clear";
import { SetEmoji } from "./../commands/user/SetEmoji";
import { Help } from "./../commands/interaction/Help";

import { Command } from "./../commands/_Command";
import { Poll } from "../commands/interaction/Poll";

export interface ICommand {
    name: "SetLanguage" | "SetEmoji" | "DeleteEmoji" | "DoEmojis" | "SetPrefix" | "ImgToAscII" | "Subscribe" | "Unsubscribe" | "Clear" | "Help" | "Poll";
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
        name: "Poll",
        alias: ["poll"],
        out: Poll
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