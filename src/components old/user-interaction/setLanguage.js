import Command from "./../command.js";
import config from "./../../config.js";
import DAO from "./../../database/DAO.js";

export default class setLanguage extends Command {
    constructor(data) {
        super(data);
        this.language = this.args[1];
        if (!this.validate()) this.updateLanguage();
    };
    
    updateLanguage() {
        const userID = this.message.author.id;
        DAO.Users.updateOne(userID, { $set: { language: this.language } })
            .then(res => {
                this.sendSuccess(config.localization[this.language].msg_setLanguage_success + this.language);
            })
            .catch(error => {
                this.sendError(this.localization.msg_setLanguage_db_error + error);
            });
    }

    //validate language
    validate() {
        //not empty
        if(this.language == undefined) {
            this.sendError(this.localization.msg_setLanguage_empty);
            return true;
        };

        //in localization object
        let flag = false;
        Object.keys(config.localization).map((objectKey, index) => {
            if (objectKey === this.language) flag = true;
        });
        if (!flag) {
            this.sendError(this.localization.msg_setLanguage_warn);
            return true;
        };
        
        return false;
    };
};