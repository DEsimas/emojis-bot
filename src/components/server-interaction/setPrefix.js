export default class setPrefix {
    constructor(context) {
        this.dao = context.dao;
        this.args = context.args;
        this.config = context.config;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);
        this.sendSuccess = success => context.sendSuccess(context, success);

        this.setPrefix();
    };

    async setPrefix() {
        if (await this.validate()) return;

        this.dao.updServer(this.message.guild.id, { $set: { prefix: this.args[1] } })
            .then(res => {
                this.sendSuccess(this.localization.msg_setPrefix_success + this.args[1]);
            })
            .catch(error => {
                this.sendError(this.localization.msg_setPrefix_db_error);
            });
    };

    async validate() {
        //check if admin
        const guildMember = await this.message.guild.members.fetch(this.message.author.id)
        const isAdmin = guildMember.permissions.has(this.config.administrator_permission);
        if (!isAdmin) {
            this.sendError(this.localization.msg_doEmojis_access_warn);
            return true;
        };

        //prevent empty prefix
        if (this.args[1] == undefined) {
            this.sendError(this.localization.msg_setPrefix_empty_warn);
            return true;
        };
        return false;
    };
};