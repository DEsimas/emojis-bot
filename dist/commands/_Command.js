"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
const Localization_1 = require("../config/Localization");
class Command {
    constructor(client, message, user, server, args) {
        this.embedColors = {
            error: "#ff0000",
            success: "#00ff00",
            discord: "#202225"
        };
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server;
        this.args = args;
        this.localization = Localization_1.Localization[user.language];
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    validateURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
    isAdmin() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildMember = yield ((_a = this.message.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(this.message.author.id));
            if (!guildMember)
                return false;
            const isAdmin = guildMember.permissions.has("ADMINISTRATOR");
            return isAdmin;
        });
    }
    ;
    sendError(message) {
        this.sendMessage(message, this.embedColors.error);
    }
    sendSuccess(message) {
        this.sendMessage(message, this.embedColors.success);
    }
    sendMessage(message, color) {
        const embed = new discord_js_1.MessageEmbed()
            .setColor(color)
            .setTitle(message);
        this.message.channel.send({ embeds: [embed] });
    }
}
exports.Command = Command;
;
//# sourceMappingURL=_Command.js.map