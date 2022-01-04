import { DAO } from "./../../database/DAO";
import { Command } from "./../_Command";

export class DeleteEmoji extends Command {
    public override async execute(): Promise<void> {
        DAO.Users.updateByUserId(this.message.author.id, { emojiID: null })
            .then(() => this.sendSuccess(this.localization.success))
            .catch(() => this.sendError(this.localization.db_error));
    }
}