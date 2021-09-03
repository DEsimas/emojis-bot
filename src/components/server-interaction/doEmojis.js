export default class doEmojis {
    constructor(context) {
        this.dao = context.dao;
        this.args = context.args;
        this.config = context.config;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);
        this.sendSuccess = success => context.sendSuccess(context, success);

        this.doEmojis();
    };

    doEmojis() {
        //switching emojis on server
        if(this.validate()) return;


        //on -> true off -> false
        switch (this.args[1]) {
            case "on":
                this.dao.updServer(this.message.guild.id, { $set: { doEmojis: true } })
                    .then(res => {
                        this.sendSuccess(this.localization.msg_doEmojis_on);
                    })
                    .catch(error => {
                        this.sendError(this.localization.msg_db_error);
                    });
                break;
            case "off":
                this.dao.updServer(this.message.guild.id, { $set: { doEmojis: false } })
                    .then(res => {
                        this.sendSuccess(this.localization.msg_doEmojis_off);
                    })
                    .catch(error => {
                        this.sendError(this.localization.msg_doEmojis_db_error + error);
                    });
                break;
            default:
                this.sendError(this.localization.msg_doEmojis_args_warn);
                break;
        };
    };

    validate() {
        //check if user is administrator
        if (!this.message.guild.member(this.message.author.id).permissions.has(this.config.administrator_permission)) {
            this.sendError(this.localization.msg_doEmojis_access_warn);
            return 1;
        };
        return 0;
    };
};