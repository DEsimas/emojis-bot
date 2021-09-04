export default class guildCreateHandler {
    constructor(context) {
        this.dao = context.dao;
        this.guild = context.guild;
        this.client = context.client;
        this.config = context.config;

        this.guildCreateHandler();
    };

    guildCreateHandler() {
        this.dao.delServer(this.guild.id);

        let nickname;
        this.client.guilds.cache.forEach(el => {
            if(el.id == this.config.support_server_id)nickname = el.me.nickname;
        });
        this.guild.member(this.client.user).setNickname(nickname);
    };
};