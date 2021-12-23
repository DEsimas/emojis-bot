import { DAO } from "./../../database/DAO";
import { Log } from "./../../Log";
import { Command } from "./../_Command";

export class Subscribe extends Command {
    public override async execute(): Promise<void> {
        if(!await this.validate()) return;

        const notification = {
            userID: this.message.author.id,
            birth: new Date(this.args[1])
        }

        DAO.Notifications.insertOne(notification).then(() => {
                this.sendSuccess(this.localization.subscribe.send_success);
            }).catch(error => {
                this.sendError(this.localization.subscribe.send_error);
                Log.error("Subscribe.ts", "Can't save notification", { error: error, notification: notification });
            });
    }

    private async validate(): Promise<boolean> {
        const notification = await DAO.Notifications.findByUserId(this.user.userID);
        const date = new Date(this.args[1]);
        
        if(notification) {
            this.sendError(this.localization.subscribe.existing_user);
            return false;
        }

        if(!(date instanceof Date && !isNaN(date.valueOf()))) {
            this.sendError(this.localization.subscribe.date_error);
            return false;
        }

        if(date >= new Date()) {
            this.sendError(this.localization.subscribe.date_error);
            return false;
        }

        return true;
    }
}