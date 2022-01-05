import { MessageEmbed } from "discord.js";
import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";
import { categories } from "../../config/CommandsList";
import { help } from "../../config/Localization";

export class Help extends Command {
    public override async execute(): Promise<void> {
        this.sendCategories();
    }

    private async getEmbed(title: string): Promise<MessageEmbed> {
        const avatar = await DAO.Avatars.getActive();
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(avatar?.color || this.embedColors.discord);
        return embed;
    }

    private async sendCategories(): Promise<void> {
        const dsc = help[this.language].categories;

        const embed = await this.getEmbed(this.localization.categories_header);
        embed.setAuthor(this.localization.categories_guide);

        categories.forEach(category => {
            embed.addField(category, dsc[category]);
        });

        this.message.channel.send({ embeds: [embed] });
    }
}