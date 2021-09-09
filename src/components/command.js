//all commands parrent. Contains common methods.
export default class Command {
    constructor(context) {
        this.parceContext(context);
    };

    //set global object to this
    parceContext(context) {
        //iterate through context
        Object.keys(context).map(key => {
            this[key] = context[key];
        });

        //set localization for quick access
        this.localization = this.config.localization[this.user.language];
    };

    //send error message
    sendError(message) {
        //create embed
        const embed = new this.Discord.MessageEmbed()
            .setColor(this.config.error_color)
            .setTitle(message);
        //send embed
        this.message.channel.send({ embeds: [embed] });
    };

    //send success message
    sendSuccess(message) {
        //create embed
        const embed = new this.Discord.MessageEmbed()
            .setColor(this.config.success_color)
            .setTitle(message);
        //send embed
        this.message.channel.send({ embeds: [embed] });
    };
};