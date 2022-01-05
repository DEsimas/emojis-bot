import { Unsubscribe } from "./../commands/notifications/Unsubscribe";
import { Subscribe } from "./../commands/notifications/Subscribe";
import { DeleteEmoji } from "./../commands/emojis/DeleteEmoji";
import { ImgToAscII } from "./../commands/special/ImgToAscII";
import { SetLanguage } from "./../commands/user/SetLanguage";
import { SetPrefix } from "./../commands/admin/SetPrefix";
import { SetEmoji } from "./../commands/emojis/SetEmoji";
import { DoEmojis } from "./../commands/emojis/DoEmojis";
import { Clear } from "./../commands/interaction/Clear";
import { Help } from "./../commands/interaction/Help";
import { Poll } from "../commands/interaction/Poll";

import { CommandName, Command, Categories } from "./Types";

export const commandsArray = ["SetLanguage", "SetEmoji", "DeleteEmoji", "DoEmojis", "SetPrefix", "ImgToAscII", "Subscribe", "Unsubscribe", "Clear", "Help", "Poll"] as const;
export const categories = ["admin", "emojis", "interaction", "notifications", "special", "user"] as const;

export const commandsObject: Record<Categories, Array<CommandName>> = {
    admin: ["DoEmojis", "SetPrefix"],
    emojis: ["DoEmojis", "DeleteEmoji", "SetEmoji"],
    interaction: ["Clear", "Help", "Poll"],
    notifications: ["Subscribe", "Unsubscribe"],
    special: ["ImgToAscII"],
    user: ["DeleteEmoji", "SetEmoji", "SetLanguage"]
};

export const commands: Record<CommandName, Command> = {
    ImgToAscII: {
        alias: ["imagetoacii", "imgtoascii", "ita"],
        out: ImgToAscII
    },
    SetEmoji: {
        alias: ["setemoji", "set"],
        out: SetEmoji
    },
    DeleteEmoji: {
        alias: ["delemoji", "del"],
        out: DeleteEmoji
    },
    SetLanguage: {
        alias: ["setlang", "lang", "setlanguage"],
        out: SetLanguage
    },
    SetPrefix: {
        alias: ["setprefix"],
        out: SetPrefix
    },
    DoEmojis: {
        alias: ["doemojis"],
        out: DoEmojis
    },
    Subscribe: {
        alias: ["subscribe", "sub"],
        out: Subscribe
    },
    Unsubscribe: {
        alias: ["unsubscribe", "unsub"],
        out: Unsubscribe
    },
    Poll: {
        alias: ["poll"],
        out: Poll
    },
    Clear: {
        alias: ["clear", "cls"],
        out: Clear
    },
    Help: {
        alias: ["help", "h"],
        out: Help
    }
}