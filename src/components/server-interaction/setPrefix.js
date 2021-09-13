import Command from "./../command.js";

export default class setPrefix extends Command {
    constructor(data) {
        super(data);
        this.setPrefix();
    };

    async setPrefix() {
        if (!await this.validate()) return;

        this.dao.updServer(this.message.guild.id, { $set: { prefix: this.args[1] } })
            .then(res => {
                super.sendSuccess(this.localization.msg_setPrefix_success + this.args[1]);
            })
            .catch(error => {
                super.sendError(this.localization.msg_setPrefix_db_error);
            });
    };

    async validate() {
        //check if admin
        if(!await super.isAdmin()) {
            super.sendError(this.localization.msg_setPrefix_access_warn);
            return false
        };

        //prevent empty prefix
        if (this.args[1] === undefined) {
            super.sendError(this.localization.msg_setPrefix_empty_warn);
            return false;
        };
        
        return true;
    };
};