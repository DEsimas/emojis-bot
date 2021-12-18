import Handler from "./_handler.js";
import DAO from "./../database/DAO.js";

export default class guildDeleteHandler extends Handler {
    constructor(data) {
        super(data);
        this.guildDeleteHandler();
    };

    guildDeleteHandler() {
        //remove server from db
        DAO.Servers.deleteOne(this.guild.id);
    };
};