import { DeleteEmoji } from "./../commands/DeleteEmoji/DeleteEmoji";
import { DoGreetings } from "./../commands/DoGreetings/DoGreetings";
import { Unsubscribe } from "./../commands/Unsubscribe/Unsubscribe";
import { SetPrefix } from "./../commands/SetPrefix/SetPrefix";
import { GetAvatar } from "./../commands/GetAvatar/GetAvatar";
import { Subscribe } from "./../commands/Subscribe/Subscribe";
import { DoEmojis } from "./../commands/DoEmojis/DoEmojis";
import { SetEmoji } from "./../commands/SetEmoji/SetEmoji";
import { Clear } from "./../commands/Clear/Clear";
import { Help } from "./../commands/Help/Help";
import { Poll } from "./../commands/Poll/Poll";

import { ImgToAscII } from "./../commands/special/ImgToAscII";
import { SetLanguage } from "./../commands/user/SetLanguage";

import { CommandName, Command, Categories } from "./Types";

export const commandsArray = ["SetLanguage", "SetEmoji", "DeleteEmoji", "DoGreetings", "DoEmojis", "SetPrefix", "GetAvatar", "ImgToAscII", "Subscribe", "Unsubscribe", "Clear", "Help", "Poll"] as const;
export const categories = ["admin", "emojis", "interaction", "notifications", "special", "user"] as const;

export const commandsObject: Record<Categories, Array<CommandName>> = {
    admin: ["DoEmojis", "SetPrefix", "DoGreetings"],
    emojis: ["DoEmojis", "DeleteEmoji", "SetEmoji"],
    interaction: ["Clear", "Help", "Poll", "GetAvatar"],
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
        alias: ["deleteemoji", "delemoji", "del"],
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
    GetAvatar: {
        alias: ["getavatar", "watchavatar", "ga"],
        out: GetAvatar
    },
    DoEmojis: {
        alias: ["doemojis"],
        out: DoEmojis
    },
    DoGreetings: {
        alias: ["dogreetings", "dowelcomes"],
        out: DoGreetings
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