export default class help {
    constructor(context) {
        this.config = context.config;
        this.message = context.message;
        this.Discord = context.Discord;
        this.localization = context.config.localization[context.user.language];

        this.help();
    };

    async help() {
        const embed = new this.Discord.MessageEmbed()
            .setAuthor(this.localization.emd_help_author)
            .setColor(this.config.embed_color);

        Object.keys(this.config.commands).forEach((key) => {
            const name = key + " - " + this.localization[this.config.about_prefix + this.config.commands[key][0]];
            const value = this.localization[this.config.describtion_prefix + this.config.commands[key][0]];
            embed.addField(name, value);
        });
        this.message.channel.send(embed);
    };
};