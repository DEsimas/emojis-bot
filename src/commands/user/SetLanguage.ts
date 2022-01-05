import { languagesArray } from "./../../config/Types";
import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

export class SetLanguage extends Command {
    public override async execute(): Promise<void> {
        const language = this.getLanguage();
        const userID = this.message.author.id;

        if(!language) return;
    
        DAO.Users.updateByUserId(userID, { language: language })
            .then(() => this.sendSuccess(this.localization.success + language))
            .catch(() => super.sendError(this.localization.db_error));
    }

    private getLanguage(): string | undefined {
        const language = this.args[1];
        if(language === undefined) {
            this.sendError(this.localization.empty);
            return undefined;
        };

        const isLang: boolean = languagesArray.find(el => (el === language)) !== undefined;

        if (!isLang) {
            this.sendError(this.localization.warn);
            return undefined;
        };

        return language;
    };
}