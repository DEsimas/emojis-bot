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
exports.SetEmoji = void 0;
const discord_js_1 = require("discord.js");
const DAO_1 = require("./../../database/DAO");
const _Command_1 = require("./../_Command");
class SetEmoji extends _Command_1.Command {
    constructor() {
        super(...arguments);
        this.emojiLink = "https://cdn.discordapp.com/emojis/";
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkEmoji()))
                return;
            DAO_1.DAO.Users.updateByUserId(this.user.userID, { emojiID: this.args[1] })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                if (this.args[1][0] === '<') {
                    const embed = new discord_js_1.MessageEmbed()
                        .setTitle(this.localization.setEmoji.updated)
                        .setColor(this.embedColors.success)
                        .setImage(this.emojiLink);
                    this.message.channel.send({ embeds: [embed] });
                }
                else if (!isNaN(Number(this.args[1]))) {
                    const embed = new discord_js_1.MessageEmbed()
                        .setTitle(this.localization.setEmoji.updated)
                        .setColor(this.embedColors.success);
                    const message = yield this.message.channel.send({ embeds: [embed] });
                    message.react(this.args[1]);
                }
                else
                    this.sendSuccess(this.localization.setEmoji.updated + '\n' + this.args[1]);
            })).catch(() => this.sendError(this.localization.setEmoji.error));
        });
    }
    checkEmoji() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.user.emojiID === this.args[1]) {
                this.sendError(this.localization.setEmoji.same_emoji);
                return false;
            }
            try {
                yield this.message.react(this.args[1]);
            }
            catch (e) {
                this.sendError(this.localization.setEmoji.error);
                return false;
            }
            return true;
        });
    }
}
exports.SetEmoji = SetEmoji;
//# sourceMappingURL=SetEmoji.js.map