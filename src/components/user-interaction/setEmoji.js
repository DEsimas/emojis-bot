export default class setEmoji {
    constructor(context) {
        this.dao = context.dao;
        this.args = context.args;
        this.config = context.config;
        this.Discord = context.Discord;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);
        this.sendSuccess = success => context.sendSuccess(context, success);

        this.setEmoji();
    };

    async setEmoji() {

        if (await this.checkEmoji()) return;

        this.dao.updUser(this.message.author.id, { $set: { emojiID: this.args[1] } })
            .then(res => {
                if (this.args[1][0] == '<') {
                    const embed = new this.Discord.MessageEmbed()
                        .setTitle(this.localization.msg_setEmoji_updated)
                        .setColor(this.config.success_color)
                        .setImage(this.config.emoji_discord_link + this.args[1].split(":")[2].slice(0, -1) + this.config.emoji_extension);
                    this.message.channel.send({ embeds: [ embed ] });
                }
                else
                    this.sendSuccess(this.localization.msg_setEmoji_updated + '\n' + this.args[1]);
            })
            .catch(error => {
                this.sendError(this.localization.msg_setEmoji_db_error);
            });
    };

    async checkEmoji() {
        //check if same
        const user = await this.dao.getUser(this.message.author.id);
        if(user.emojiID == this.args[1]) {
            this.sendError(this.localization.msg_setEmoji_same_emoji)
            return true;
        };

        //check if valid
        try {
            await this.message.react(this.args[1]);
        } catch (e) {
            this.sendError(this.localization.msg_setEmoji_error);
            return true;
        };

        return false;
    };
};