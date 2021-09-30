import Handler from "./_handler.js";

export default class guildDeleteHandler extends Handler {
    constructor(data) {
        super(data);
        this.guildDeleteHandler();
    };

    guildDeleteHandler() {
        //remove server from db
        this.DAO.Servers.deleteOne(this.guild.id);
    };
};