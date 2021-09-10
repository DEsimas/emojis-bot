import Handler from "./_handler.js";
import config from "./../config.js";

export default class guildCreateHandler extends Handler {
    constructor(data) {
        super(data);
        this.guildCreateHandler();
    };

    guildCreateHandler() {
        //remove server from db so it can be recreated with default params
        this.dao.delServer(this.guild.id);

        //set current nickname on new server
        let nickname;
        this.client.guilds.cache.forEach(el => {
            if(el.id == config.support_server_id)nickname = el.me.nickname;
        });
        this.guild.members.fetch(this.client.user).then(user => user.setNickname(nickname));
    };
};