export default class guildDeleteHandler {
    constructor(context) {
        this.dao = context.dao;
        this.guild = context.guild;

        this.guildDeleteHandler();
    };

    guildDeleteHandler() {
        //remove server from db
        this.dao.delServer(this.guild.id);
    };
};