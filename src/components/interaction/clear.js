export default class clear {
    constructor(context) {
        this.args = context.args;
        this.config = context.config;
        this.client = context.client;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);

        this.clear();
    };

    clear() {
        //limit of deleted messages from args or constant
        let limit = this.getLimit();

        this.message.channel.messages.fetch({ limit: this.config.default_scan_limit })
            .then(messages => {
                messages.forEach(element => {
                    if (limit > 0) {
                        if (element.author.id == this.client.user.id) {
                            element.delete();
                            limit--;
                        }
                    }
                });
            })
            .catch(error => {
                this.sendError(this.localization.msg_clear_error);
            });
    };

    getLimit() {
        let limit = 0;
        if (isNaN(this.args[1])) limit = this.config.default_scan_limit;
        else limit = parseInt(this.args[1]);
        return limit;
    };
};