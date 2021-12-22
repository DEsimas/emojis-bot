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
exports.Help = void 0;
const discord_js_1 = require("discord.js");
const DAO_1 = require("./../../database/DAO");
const _Command_1 = require("./../_Command");
const CommandsList_1 = require("./../../config/CommandsList");
class Help extends _Command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const avatar = yield DAO_1.DAO.Avatars.getActive();
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(this.localization.help.author)
                .setColor((avatar === null || avatar === void 0 ? void 0 : avatar.color) || this.embedColors.discord);
            CommandsList_1.commands.forEach(cmd => {
                const name = cmd.name + " - " + this.localization.help.about[cmd.name];
                const value = this.localization.help.description[cmd.name];
                embed.addField(name, value);
            });
            this.message.channel.send({ embeds: [embed] });
        });
    }
}
exports.Help = Help;
//# sourceMappingURL=Help.js.map