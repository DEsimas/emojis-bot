import Discord from "discord.js";
import R34 from "rule34js";

import config from "./../../config.js";
import Command from "./../command.js";

export default class rule34 extends Command {
    constructor(data) {
        super(data);
        this.rule34();
    };

    rule34() {
        if (!this.message.channel.nsfw) {
            super.sendError(this.localization.msg_ruel34_nsfw_error);
            return;
        }

        this.parseArgs();

        if (!this.options.tags.length) {
            super.sendError(this.localization.msg_rule34_tag_error);
            return;
        }

        //request to rule34.xxx
        R34.posts({ tags: this.options.tags })
            .then(response => this.responseHandler(response))
            .catch(err => super.sendError(this.localization.msg_rule34_fetch_error)); // check connection with vpn

    };

    //get tags and amount of images from arguments
    parseArgs() {
        let limit = 1;
        let tags = [];
        this.args.forEach((element, index) => {
            if (!index) return;
            if (!isNaN(element)) {
                limit = Number(element);
                return;
            };

            tags.push(element);
        });

        if (limit > config.rule34_publication_limit) limit = config.rule34_publication_limit;

        this.options = {
            tags: tags,
            limit: limit
        };
    };

    //handle responser from r34
    responseHandler(response) {
        if (!response.count) {
            super.sendError(this.localization.msg_rule34_hentai_not_found);
            return;
        };

        const posts = response.posts.constructor === Array ? response.posts : [response.posts];

        this.sendImages(this.shuffle(posts), response.count <= this.options.limit ? response.posts.length : this.options.limit);
    };

    //sending images several in each message for optimization
    async sendImages(posts, limit) {
        const avatar = await this.dao.getAvatar();
        const color = avatar.color;

        let embeds = [];
        posts.forEach(async (el, index) => {
            if (index >= limit) return;

            const embed = new Discord.MessageEmbed()
                .setImage(el.file_url)
                .setColor(color);
            embeds.push(embed);

            if ((index + 1) %  config.links_per_message == 0) {
                this.message.channel.send({ embeds: embeds });
                embeds = [];
            }
        });

        if (embeds.length) this.message.channel.send({ embeds: embeds });

        //link to first message for comfortable fallback
        if (limit > this.links_per_message) this.message.channel.send(this.message.url);
    };

    //array shuffler for random output (not mine)
    shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }
};