import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

import { EmbedBuilder } from "discord.js";

export class SetEmoji extends Command {
    private readonly emojiLink = "https://cdn.discordapp.com/emojis/";

    public async execute(): Promise<void> {
        if(!(await this.checkEmoji())) return;

        DAO.Users.updateByUserId(this.user.userID, { emojiID: this.args[1] })
            .then(async () => {
                if(this.args[1][0] === '<') {                           // If emoji passed as emoji
                    const embed = new EmbedBuilder()
                        .setTitle(this.localization.updated)
                        .setColor(this.embedColors.success)
                        .setImage(this.emojiLink);
                    this.message.channel.send({ embeds: [ embed ] });
                } else if(!isNaN(Number(this.args[1]))) {               // If emoji passed as id
                    const embed = new EmbedBuilder()
                        .setTitle(this.localization.updated)
                        .setColor(this.embedColors.success)
                    const message = await this.message.channel.send({ embeds: [ embed ] });
                    message.react(this.args[1]);
                } else this.sendSuccess(this.localization.updated + '\n' + this.args[1]);
            }).catch(() => this.sendError(this.localization.error));
    }

    private async checkEmoji(): Promise<boolean> {
        if(this.user.emojiID === this.args[1]) {
            this.sendError(this.localization.same_emoji);
            return false;
        }

        try {
            await this.message.react(this.args[1]);
        } catch(e) {
            this.sendError(this.localization.error);
            return false;
        }

        return true;
    }
}