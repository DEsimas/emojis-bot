"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const ImgToAscII_1 = require("../commands/special/ImgToAscII");
const DeleteEmoji_1 = require("../commands/user/DeleteEmoji");
const SetLanguage_1 = require("../commands/user/SetLanguage");
const Unsubscribe_1 = require("../commands/user/Unsubscribe");
const SetPrefix_1 = require("../commands/admin/SetPrefix");
const Subscribe_1 = require("../commands/user/Subscribe");
const DoEmojis_1 = require("../commands/admin/DoEmojis");
const Clear_1 = require("../commands/interaction/Clear");
const SetEmoji_1 = require("../commands/user/SetEmoji");
const Help_1 = require("../commands/interaction/Help");
;
exports.commands = [
    {
        name: "ImgToAscII",
        alias: ["imagetoacii", "imgtoascii", "ita"],
        out: ImgToAscII_1.ImgToAscII
    },
    {
        name: "SetEmoji",
        alias: ["setemoji", "set"],
        out: SetEmoji_1.SetEmoji
    },
    {
        name: "DeleteEmoji",
        alias: ["delemoji", "del"],
        out: DeleteEmoji_1.DeleteEmoji
    },
    {
        name: "SetLanguage",
        alias: ["setlang", "lang", "setlanguage"],
        out: SetLanguage_1.SetLanguage
    },
    {
        name: "SetPrefix",
        alias: ["setprefix"],
        out: SetPrefix_1.SetPrefix
    },
    {
        name: "DoEmojis",
        alias: ["doemojis"],
        out: DoEmojis_1.DoEmojis
    },
    {
        name: "Subscribe",
        alias: ["subscribe", "sub"],
        out: Subscribe_1.Subscribe
    },
    {
        name: "Unsubscribe",
        alias: ["unsubscribe", "unsub"],
        out: Unsubscribe_1.Unsubscribe
    },
    {
        name: "Clear",
        alias: ["clear", "cls"],
        out: Clear_1.Clear
    },
    {
        name: "Help",
        alias: ["help", "h"],
        out: Help_1.Help
    },
];
//# sourceMappingURL=CommandsList.js.map