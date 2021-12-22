import { MessageEmbed } from "discord.js";
<<<<<<< HEAD:src/commands/interaction/Help.ts
import { DAO } from "./../../database/DAO.js";
import { Command } from "./../_Command.js";
import { commands } from "./../../config/CommandsList.js";
=======
import { DAO } from "../database/DAO";
import { Command } from "./_Command";
import { commands } from "./../config/CommandsList";
>>>>>>> parent of c5b0847 (commands grouping):src/commands/Help.ts

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