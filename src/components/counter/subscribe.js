import Command from "./../command.js";
import config from "./../../config.js";
import DAO from "../../database/DAO.js";

export default class subscribe extends Command{
    constructor(data) {
        super(data);
        this.subscribe();
    };
    
    validate() {
        /*validation*/
        return true;
    };
    
    subscribe() {
        if(!this.validate()) return;
        
        DAO.Notifications.addOne(this.message.author.id, new Date(this.args[1]), this.args[2]);
    };
    
};