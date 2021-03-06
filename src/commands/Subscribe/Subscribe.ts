import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";
import { Log } from "./../../components/Log";

export class Subscribe extends Command {
    public async execute(): Promise<void> {
        if(!await this.validate()) return;

        const notification = {
            userID: this.message.author.id,
            birth: new Date(this.args[1])
        }

        DAO.Notifications.insertOne(notification).then(() => {
                this.sendSuccess(this.localization.send_success);
                Log.info("Subscribe.ts", "New notification added", { notification: notification });
            }).catch(error => {
                this.sendError(this.localization.send_error);
                Log.error("Subscribe.ts", "Can't save notification", { error: error, notification: notification });
            });
    }

    private async validate(): Promise<boolean> {
        const notification = await DAO.Notifications.findByUserId(this.user.userID);
        const date = new Date(this.args[1]);
        
        if(notification) {
            this.sendError(this.localization.existing_user);
            return false;
        }

        if(!(date instanceof Date && !isNaN(date.valueOf()))) {
            this.sendError(this.localization.date_error);
            return false;
        }

        if(date >= new Date()) {
            this.sendError(this.localization.date_error);
            return false;
        }

        return true;
    }
}