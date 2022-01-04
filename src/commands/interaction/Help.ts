import { MessageEmbed } from "discord.js";
import { DAO } from "./../../database/DAO";
import { Command } from "./../_Command";
import { commandsArray } from "../../config/Types";
import { help } from "../../config/Localization";

export class Help extends Command {
    public override async execute(): Promise<void> {
        const avatar = await DAO.Avatars.getActive();

        const embed = new MessageEmbed()
            .setAuthor(this.localization.author)
            .setColor(avatar?.color || this.embedColors.discord)

        commandsArray.forEach(command => {
            const name = command + " - " + help[this.language].about[command];
            const value = help[this.language].description[command];
            embed.addField(name, value);
        });

        this.message.channel.send({ embeds: [embed] });
    }
}