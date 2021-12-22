import { DAO } from "./../../database/DAO.js";
import { Command } from "./../_Command.js";

export class DeleteEmoji extends Command {
    public override async execute(): Promise<void> {
        DAO.Users.updateByUserId(this.message.author.id, { emojiID: null })
            .then(() => this.sendSuccess(this.localization.deleteEmoji.success))
            .catch(() => this.sendError(this.localization.deleteEmoji.db_error));
    }
}