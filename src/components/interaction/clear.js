import Command from "./../command.js";
import config from "./../../config.js";

export default class clear extends Command {
    constructor(data) {
        super(data);
        this.clear();
    };

    clear() {
        //limit of deleted messages from args or constant
        this.setLimit();

        this.message.channel.messages.fetch({ limit: config.default_scan_limit })
            .then(messages => {
                messages.forEach(element => {
                    if (this.limit > 0) {
                        if (element.author.id === this.client.user.id) {
                            element.delete();
                            this.limit--;
                        }
                    }
                });
            })
            .catch(error => {
                this.sendError(this.localization.msg_clear_error + error);
            });
    };

    setLimit() {
        this.limit = 0;
        if (isNaN(this.args[1])) this.limit = config.default_scan_limit;
        else this.limit = parseInt(this.args[1]);
    };
};