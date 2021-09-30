import Command from "./../command.js";

export default class doEmojis extends Command {
    constructor(data) {
        super(data);
        this.doEmojis();
    };

    //switching emojis on server
    async doEmojis() {
        //check if sender is admin
        if (!await super.isAdmin()) {
            super.sendError(this.localization.msg_doEmojis_access_warn);
            return;
        };

        //on -> true off -> false
        switch (this.args[1]) {
            case "on":
                this.caseON();
                break;
            case "off":
                this.caseOFF();
                break;
            default:
                super.sendError(this.localization.msg_doEmojis_args_warn);
                break;
        };

    };
    
    //switch ON
    caseON() {
        this.DAO.Servers.updateOne(this.message.guild.id, { $set: { doEmojis: true } })
            .then(res => {
                this.sendSuccess(this.localization.msg_doEmojis_on);
            })
            .catch(error => {
                this.sendError(this.localization.msg_db_error);
            });
    };

    //switch OFF
    caseOFF() {
        this.DAO.Servers.updateOne(this.message.guild.id, { $set: { doEmojis: false } })
            .then(res => {
                this.sendSuccess(this.localization.msg_doEmojis_off);
            })
            .catch(error => {
                this.sendError(this.localization.msg_doEmojis_db_error + error);
            });
    };
};