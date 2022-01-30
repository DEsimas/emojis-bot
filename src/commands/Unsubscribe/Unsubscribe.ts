import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";
import { Log } from "./../../components/Log";

export class Unsubscribe extends Command {
    public async execute(): Promise<void> {
        const id = this.message.author.id;
        const notif = await DAO.Notifications.findByUserId(id);

        if(notif === null) {
            this.sendError(this.localization.not_subbed);
            return;
        }

        DAO.Notifications.deleteByUserId(id).then(() => Log.info("Unsubscribe.ts", "Notification removed", { notification: notif }));

        this.sendSuccess(this.localization.success);
    }
}