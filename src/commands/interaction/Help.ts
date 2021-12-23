import { MessageEmbed } from "discord.js";
import { DAO } from "./../../database/DAO";
import { Command } from "./../_Command";
import { commands } from "./../../config/CommandsList";

export class Help extends Command {
    public override async execute(): Promise<void> {
        const avatar = await DAO.Avatars.getActive();

        const embed = new MessageEmbed()
            .setAuthor(this.localization.help.author)
            .setColor(avatar?.color || this.embedColors.discord)

        commands.forEach(cmd => {
            const name = cmd.name + " - " + this.localization.help.about[cmd.name];
            const value = this.localization.help.description[cmd.name];
            embed.addField(name, value);
        });

        this.message.channel.send({ embeds: [embed] });
    }
}