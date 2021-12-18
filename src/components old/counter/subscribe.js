import Command from "./../command.js";
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
        };

        if(new Date(this.args[1]) == "Invalid Date" || new Date(this.args[1]) >= new Date() || this.args[1] === undefined) {
            super.sendError(this.localization.msg_subscribe_date_error);
            return false;
        };

        return true;
    };
    
    async subscribe() {
        if(!await this.validate()) return;
        
        DAO.Notifications.addOne(this.message.author.id, new Date(this.args[1]));

        super.sendSuccess(this.localization.msg_subscribe_send_success);
    };
    
};