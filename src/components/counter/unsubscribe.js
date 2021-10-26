import Command from "./../command.js";
import DAO from "../../database/DAO.js";

export default class unsubscribe extends Command{
    constructor(data) {
        super(data);
        this.unsubscribe();
    };

    async unsubscribe() {
        const id = this.message.author.id;

        if(await DAO.Notifications.getOne(id) === null) {
            super.sendError(this.localization.msg_unsubscribe_not_subbed);
            return;
        };

        await DAO.Notifications.deleteOne(id);

        super.sendSuccess(this.localization.msg_unsubscribe_success);
    };    
};