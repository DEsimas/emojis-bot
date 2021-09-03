export default class deleteEmoji {
    constructor(context) {
        this.dao = context.dao
        this.config = context.config;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);
        this.sendSuccess = success => context.sendSuccess(context, success);

        this.deleteEmoji();
    };

    deleteEmoji() {
        this.dao.updUser(this.message.author.id, { $set: { emojiID: null } })
            .then(res => {
                this.sendSuccess(this.localization.msg_deleteEmoji_success);
            })
            .catch(error => {
                this.sendError(this.localization.msg_deleteEmoji_db_error);
            });
    };
};