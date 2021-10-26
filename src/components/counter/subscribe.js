import Command from "./../command.js";
import config from "./../../config.js";
import DAO from "../../database/DAO.js";

export default class subscribe extends Command{
    constructor(data) {
        super(data);
        this.subscribe();
    };
    
    async validate() {
        const user = await DAO.Notifications.getOne(this.message.author.id);

        if(user) {
            super.sendError(this.localization.msg_subscribe_existing_user);
            return false;
        }

        if(new Date(this.args[1]) == "Invalid Date" || new Date(this.args[1]) >= new Date() || this.args[1] === undefined) {
            super.sendError(this.localization.msg_subscribe_date_error);
            return false;
        };

        if(this.args[2] > 120 || this.args[2] <= 0 || Math.abs(new Date(this.args[1]).getFullYear() - new Date().getFullYear()) >= this.args[2] || isNaN(Number(this.args[2]))) {
            super.sendError(this.localization.msg_subscribe_duration_error);
            return false;
        };

        return true;
    };
    
    async subscribe() {
        if(!await this.validate()) return;
        
        DAO.Notifications.addOne(this.message.author.id, new Date(this.args[1]), this.args[2]);

        super.sendSuccess(this.localization.msg_subscribe_send_success);
    };
    
};