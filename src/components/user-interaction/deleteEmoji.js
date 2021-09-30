import Command from "./../command.js";
import DAO from "./../../database/DAO.js";

export default class deleteEmoji extends Command {
    constructor(data) {
        super(data);
        this.deleteEmoji();
    };

    deleteEmoji() {
        DAO.Users.updateOne(this.message.author.id, { $set: { emojiID: null } })
            .then(res => {
                super.sendSuccess(this.localization.msg_deleteEmoji_success);
            })
            .catch(error => {
                super.sendError(this.localization.msg_deleteEmoji_db_error);
            });
    };
};