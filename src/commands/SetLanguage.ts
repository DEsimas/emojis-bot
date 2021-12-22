<<<<<<< HEAD:src/commands/user/SetLanguage.ts
import { Localization } from "./../../config/Localization.js";
import { DAO } from "./../../database/DAO.js";
import { Command } from "./../_Command.js";
=======
import { Localization } from "../config/Localization";
import { DAO } from "../database/DAO";
import { Command } from "./_Command";
>>>>>>> parent of c5b0847 (commands grouping):src/commands/SetLanguage.ts

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