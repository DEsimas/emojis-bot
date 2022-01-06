import { MessageEmbed } from "discord.js";
import { DAO } from "../../database/DAO";
import { Command } from "../Command";

export class GetAvatar extends Command {
    public override async execute(): Promise<void> {
        const user = this.message.mentions.users.first();
        if (!user) return this.sendError(this.localization.error);
        const avatarURL = user.avatarURL();
        if (!avatarURL) return this.sendError(this.localization.error);

        const embedColor = (await DAO.Avatars.getActive())?.color;
        const embed = new MessageEmbed()
            .setColor(embedColor || this.embedColors.discord)
            .setImage(avatarURL);

        this.message.channel.send({ embeds: [embed] });
    }
}