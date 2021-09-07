export default class setLanguage {
    constructor(context) {
        this.dao = context.dao
        this.args = context.args;
        this.config = context.config;
        this.message = context.message;
        this.localization = context.config.localization[context.user.language];
        this.sendError = error => context.sendError(context, error);
        this.sendSuccess = success => context.sendSuccess(context, success);

        this.setLanguage();
    };

    setLanguage() {
        const userID = this.message.author.id;
        const language = this.args[1];

        if (this.validate(language)) return;


        //update language
        this.dao.updUser(userID, { $set: { language: language } })
            .then(res => {
                this.sendSuccess(this.config.localization[language].msg_setLanguage_success + language);
            })
            .catch(error => {
                this.sendError(this.localization.msg_setLanguage_db_error);
            });
    };

    validate(language) {
        //validate language
        if(language == undefined) {
            this.sendError(this.localization.msg_setLanguage_empty);
            return 1;
        };

        let flag = false;
        Object.keys(this.config.localization).map(function (objectKey, index) {
            if (objectKey == language) flag = true;
        });
        if (!flag) {
            this.sendError(this.localization.msg_setLanguage_warn);
            return 1;
        };
        return 0;
    };
};