import nhentai from "nhentai";
import Discord from "discord.js";

import Command from "./../command.js";
import config from "./../../config.js";

export default class getHentai extends Command{
    constructor(data) {
        super(data);
        this.getHentai();
    };

    async getHentai() {
        const ID = this.args[1]

        //validate id
        if (this.validate(ID)) return;

        //if id random send random
        if (ID === config.random_id) {
            this.getRandom();
            return;
        }
        
        //fetch doujin using nhentai library
        const api = new nhentai.API();
        api.fetchDoujin(ID).then(doujin => {
            this.doujin = doujin;
            this.handleDoujin();
        }).catch(err => super.sendError(this.localization.msg_getHentai_fetch_error + err));
    };

    //validate id
    validate(ID) {
        //is channel nsfw
        if (!this.message.channel.nsfw) {
            super.sendError(this.localization.msg_getHentai_nsfw_warn);
            return true;
        };

        //check if id is random
        if(ID === config.random_id) return false;

        //check if id in ids range
        if (ID == "" || ID > 999999 || ID < 1 || isNaN(ID)) {
            super.sendError(this.localization.msg_getHentai_id_warn);
            return true;
        };

        return false;
    };

    //check if has prohibited tags
    isProhibited() {
        let isProhibited = false;
        config.black_tags_list.forEach(el => {
            if (this.doujin.tags.all.find(tag => (tag.name == el))) isProhibited = true;
        });

        return isProhibited;
    };

    async handleDoujin() {
        //if didnt get doujin
        if(!this.doujin){
            super.sendError(this.localization.msg_getHentai_fetch_error);
            return;
        };

        //if has prohimited tags
        if(this.isProhibited()) {
            super.sendError(this.localization.msg_getHentai_black_list_error);
            return;
        };

        //send doujin
        await this.sendInfo();
        this.sendDoujin();
    };

    //send info about doujin
    async sendInfo() {
        //parce tags to string
        let tags = this.doujin.tags.all.map(tag => tag.name).join(', ');

        //create and send embed
        const embed = new Discord.MessageEmbed()
            .setAuthor(this.localization.msg_getHentai_nhentai)
            .addField(this.localization.msg_getHentai_intro, "**" + this.doujin.titles.pretty + "**")
            .addField(this.localization.msg_getHentai_tags, tags)
            .setThumbnail(this.doujin.thumbnail.url)
            .setColor(this.avatar.color);
        this.message.channel.send({ embeds: [embed] });
    };

    //send doujin pages several per message for optimization
    async sendDoujin() {
        //iterate through all doujin pages
        let embeds = [];
        this.doujin.pages.forEach((el, index) => {
            const embed = new Discord.MessageEmbed()
                .setImage(el.url)
                .setColor(this.avatar.color);

            embeds.push(embed);

            //if in array [links_per_message] lincks send them
            if ((index + 1) % config.links_per_message == 0) {
                this.message.channel.send({ embeds: embeds });
                embeds = [];
            }
        });

        //if urls remained in array send them
        if (embeds.length) this.message.channel.send({ embeds: embeds });

        //link to the first message for comfortable fallback
        this.message.channel.send(this.message.url);
    };

    //check if doujin in english
    isEnglish() {
        let isEnglish = false;
        this.doujin.tags.all.forEach(tag => {
            if (tag.name === config.english_lang_tag) isEnglish = true;
        });
        return isEnglish;
    };

    //generate random id in ids range
    getRandomID() {
        return Math.floor(Math.random() * 1000000);
    };

    //send random doujin
    async getRandom() {
        const api = new nhentai.API();
        let acknowlaged = false;

        //request doujins till get normal one
        while (!acknowlaged) {
            const ID = this.getRandomID();
            if(!this.validate(ID)) {
                this.doujin = await api.fetchDoujin(ID).catch(() => console.log("error in random hentai request"));
                
                if(this.doujin !== null && this.doujin !== undefined) {
                    if(!this.isProhibited() && this.isEnglish()) {
                        await this.sendInfo(this.doujin);
                        this.sendDoujin(this.doujin);
                        acknowlaged = true;
                    };
                };
            };
        };
    };
};