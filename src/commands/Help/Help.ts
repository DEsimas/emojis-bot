import { categories, commandsObject } from "./../../config/CommandsList";
import { help } from "./../../config/Localization";
import { Categories } from "./../../config/Types";
import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

import { MessageEmbed } from "discord.js";

export class Help extends Command {
    public async execute(): Promise<void> {
        const category = this.getCategory();
        if(category) this.sendCommands(category);
        else this.sendCategories();
    }

    private getCategory(): Categories | null {
        for(let i = 0; i < categories.length; i++) {
            if(categories[i] === this.args[1]?.toLowerCase()) return categories[i];
        }
        return null;
    }

    private async getEmbed(title: string, author: string): Promise<MessageEmbed> {
        const avatar = await DAO.Avatars.getActive();
        const embed = new MessageEmbed()
            .setAuthor(author)
            .setTitle(title)
            .setColor(avatar?.color || this.embedColors.discord);
        return embed;
    }

    private async sendCategories(): Promise<void> {
        const dsc = help[this.language].categories;

        const embed = await this.getEmbed(this.localization.categories_header, this.localization.categories_guide);

        categories.forEach(category => {
            embed.addField(category, dsc[category]);
        });

        this.message.channel.send({ embeds: [embed] });
    }

    private async sendCommands(category: Categories): Promise<void> {
        const embed = await this.getEmbed(this.localization.commands_header, category);

        commandsObject[category].forEach(command => {
            embed.addField(`${command} - ${help[this.language].about[command]}`, help[this.language].description[command]);
        });

        this.message.channel.send({ embeds: [embed] });
    }
}