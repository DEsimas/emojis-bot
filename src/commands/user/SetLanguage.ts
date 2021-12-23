import { Localization } from "./../../config/Localization";
import { DAO } from "./../../database/DAO";
import { Command } from "./../_Command";

export class SetLanguage extends Command {
    public override async execute(): Promise<void> {
        const language = this.getLanguage();
        const userID = this.message.author.id;

        if(!language) return;
    
        DAO.Users.updateByUserId(userID, { language: language })
            .then(() => this.sendSuccess(this.localization.setLanguage.success + language))
            .catch(() => super.sendError(this.localization.setLanguage.db_error));
    }

    private getLanguage(): string | undefined {
        const language = this.args[1];
        if(language === undefined) {
            this.sendError(this.localization.setLanguage.empty);
            return undefined;
        };

        let flag = false;
        Object.keys(Localization).map(objectKey => {
            if (objectKey === language) flag = true;
        });

        if (!flag) {
            this.sendError(this.localization.setLanguage.warn);
            return undefined;
        };

        return language;
    };
}