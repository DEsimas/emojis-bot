import Discord from "discord.js";

import config from "./../config.js";

export default class Command {
    constructor(data) {
        this.parseData(data);
    };

    //set received data to this
    parseData(data) {
        //iterate through data
        Object.keys(data).map(key => {
            this[key] = data[key];
        });

        //set localization for quick access
        this.localization = config.localization[this.user.language];
    };

    //send error message
    sendError(message) {
        //create embed
        const embed = new Discord.MessageEmbed()
            .setColor(config.error_color)
            .setTitle(message);
        //send embed
        this.message.channel.send({ embeds: [embed] });
    };

    //send success message
    sendSuccess(message) {
        //create embed
        const embed = new Discord.MessageEmbed()
            .setColor(config.success_color)
            .setTitle(message);
        //send embed
        this.message.channel.send({ embeds: [embed] });
    };
};