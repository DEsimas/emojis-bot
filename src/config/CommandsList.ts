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
import { Poll } from "../commands/interaction/Poll";

import { CommandName, Command } from "./Types";

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