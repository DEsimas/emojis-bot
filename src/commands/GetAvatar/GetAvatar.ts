import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

import { EmbedBuilder } from "discord.js";

export class GetAvatar extends Command {
    public async execute(): Promise<void> {
        const users = this.message.mentions.users;
        if (users.size === 0) {
            this.sendError(this.localization.error);
            return;
        }

        users.map(async (mention, id) => {
            const user = this.message.mentions.users.find((user, key) => (id === key));
            const avatarURL = user?.avatarURL();

            if (!avatarURL) {
                this.sendError(this.localization.error);
                return;
            }

            const embedColor = (await DAO.Avatars.getActive())?.color;
            const embed = new EmbedBuilder()
                .setColor(embedColor || this.embedColors.discord)
                .setImage(avatarURL);

            this.message.channel.send({ embeds: [embed] });
        });
    }
}