import { categories, commandsObject } from "./../../config/CommandsList";
import { help } from "./../../config/Localization";
import { Categories } from "./../../config/Types";
import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

import { APIEmbedField, EmbedBuilder } from "discord.js";

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

    private async getEmbed(title: string, author: string): Promise<EmbedBuilder> {
        const avatar = await DAO.Avatars.getActive();
        const embed = new EmbedBuilder()
            .setAuthor({ name: author })
            .setTitle(title)
            .setColor(avatar?.color || this.embedColors.discord);
        return embed;
    }

    private async sendCategories(): Promise<void> {
        const dsc = help[this.language].categories;

        const embed = await this.getEmbed(this.localization.categories_header, this.localization.categories_guide);

        const fields : Array<APIEmbedField> = [];

        categories.forEach(category => {
            fields.push({
                name: category,
                value: dsc[category]
            });
        });

        embed.addFields(fields);

        this.message.channel.send({ embeds: [embed] });
    }

    private async sendCommands(category: Categories): Promise<void> {
        const embed = await this.getEmbed(this.localization.commands_header, category);

        const fields: Array<APIEmbedField> = [];

        commandsObject[category].forEach(command => {
            fields.push({
                name: `${command} - ${help[this.language].about[command]}`,
                value: help[this.language].description[command]
            });
        });

        embed.addFields(fields);

        this.message.channel.send({ embeds: [embed] });
    }
}