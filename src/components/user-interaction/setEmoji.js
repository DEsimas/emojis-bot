import Discord from "discord.js";

import Command from "./../command.js";
import config from "./../../config.js";

export default class setEmoji extends Command{
    constructor(data) {
        super(data);
        this.setEmoji();
    };

    async setEmoji() {

        if (!await this.checkEmoji()) return;

        this.dao.updUser(this.message.author.id, { $set: { emojiID: this.args[1] } })
            .then(async res => {
                //if custom emoji send image else just emoji
                if (this.args[1][0] == '<') {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(this.localization.msg_setEmoji_updated)
                        .setColor(config.success_color)
                        .setImage(config.emoji_discord_link + this.args[1].split(":")[2].slice(0, -1) + config.emoji_extension);
                    this.message.channel.send({ embeds: [ embed ] });
                } else if(!isNaN(this.args[1])) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(this.localization.msg_setEmoji_updated)
                        .setColor(config.success_color);
                    const message = await this.message.channel.send({ embeds: [ embed ] });
                    message.react(this.args[1]);
                } else
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
            super.sendError(this.localization.msg_setEmoji_same_emoji)
            return false;
        };

        //check if valid
        try {
            await this.message.react(this.args[1]);
        } catch (e) {
            this.sendError(this.localization.msg_setEmoji_error);
            return false;
        };

        return true;
    };
};