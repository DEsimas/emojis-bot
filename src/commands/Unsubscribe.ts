import { DAO } from "../database/DAO";
import { Command } from "./_Command";

export class Unsubscribe extends Command {
    public override async execute(): Promise<void> {
        const id = this.message.author.id;

        if(await DAO.Notifications.findByUserId(id) === null) {
            this.sendError(this.localization.unsubscribe.not_subbed);
            return
        }

        DAO.Notifications.deleteByUserId(id);

        this.sendSuccess(this.localization.unsubscribe.success);
    }
}