import Command from "./../command.js";

export default class deleteEmoji extends Command {
    constructor(data) {
        super(data);
        this.deleteEmoji();
    };

    deleteEmoji() {
        this.dao.updUser(this.message.author.id, { $set: { emojiID: null } })
            .then(res => {
                super.sendSuccess(this.localization.msg_deleteEmoji_success);
            })
            .catch(error => {
                super.sendError(this.localization.msg_deleteEmoji_db_error);
            });
    };
};