export default class getHentai {
    constructor(context) {
        this.sendError = error => context.sendError(context, error);
        this.Discord = context.Discord;
        this.nhentai = context.nhentai;
        this.message = context.message;
        this.links_per_message = context.config.links_per_message;
        this.args = context.args;
        this.localization = context.config.localization[context.user.language];
        this.embed_color = context.config.embed_color;

        this.getHentai();
    };

    async getHentai() {
        
        const ID = this.args[1]
        
        if(this.validate(ID)) return;

        //fetch doujin using COOL nhentai library
        const api = new this.nhentai.API();
        api.fetchDoujin(ID).then(async doujin => {
            await this.sendInfo(doujin);
            this.sendDoujin(doujin);
        }).catch(error => this.sendError(this.localization.msg_getHentai_fetch_error));
    };

    //check if you can send hentai
    validate(ID) {
        //is channel nsfw
        if (!this.message.channel.nsfw) {
            this.sendError(this.localization.msg_getHentai_nsfw_warn);
            return 1;
        };

        //check if id is valid
        if (ID == "" || ID > 999999 || ID < 1 || isNaN(ID)) {
            this.sendError(this.localization.msg_getHentai_id_warn);
            return 1;
        };

        return 0;
    };

    //send info about doujin
    async sendInfo(doujin) {
        let tags = doujin.tags.all.map(tag => tag.name).join(', ');

        const embed = new this.Discord.MessageEmbed()
            .setAuthor(this.localization.msg_getHentai_nhentai)
            .addField(this.localization.msg_getHentai_intro, "**" + doujin.titles.pretty + "**")
            .addField(this.localization.msg_getHentai_tags, tags)
            .setThumbnail(doujin.thumbnail.url)
            .setColor(this.embed_color);
        this.message.channel.send({ embeds: [embed] });
    };

    //send doujin pages 5 per message for optimization
    sendDoujin(doujin) {
        let msg = "";
        doujin.pages.forEach((el, index) => {
            msg = msg + el.url + '\n';

            if ((index+1) % this.links_per_message == 0) {
                this.message.channel.send(msg);
                msg = "";
            }
        });

        if (msg) this.message.channel.send(msg);

        //link to first message for comfortable fallback
        this.message.channel.send(this.message.url);
    };
};