export default class guildCreateHandler {
    constructor(context) {
        this.dao = context.dao;
        this.guild = context.guild;

        this.guildCreateHandler();
    };

    guildCreateHandler() {
        this.dao.delServer(this.guild.id);
    };
};