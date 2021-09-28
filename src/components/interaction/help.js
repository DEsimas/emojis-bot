import Discord from "discord.js";

import Command from "./../command.js";
import config from "./../../config.js";

export default class help extends Command {
    constructor(data) {
        super(data);
        this.help();
    };

    async help() {
        //init embed
        const embed = new Discord.MessageEmbed()
            .setAuthor(this.localization.emd_help_author)
            .setColor(this.avatar.color);

        //add fields with commands
        Object.keys(config.commands).forEach((key) => {
            const name = key + " - " + this.localization[config.about_prefix + config.commands[key][0]];
            const value = this.localization[config.describtion_prefix + config.commands[key][0]];
            embed.addField(name, value);
        });
        this.message.channel.send({ embeds: [embed] });
    };
};