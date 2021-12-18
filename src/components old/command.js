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

    //return true if argument is link
    validateURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
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

    //check if user administrator
    async isAdmin() {
        const guildMember = await this.message.guild.members.fetch(this.message.author.id)
        const isAdmin = guildMember.permissions.has(config.administrator_permission);
        return isAdmin;
    };
};