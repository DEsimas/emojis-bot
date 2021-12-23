import { DAO } from "./../database/DAO";
import { Log } from "./../Log";

import { Client } from "discord.js";
import { schedule, ScheduledTask } from "node-cron";

export class UserInterfaceUpdater {
    private readonly client: Client;

    private readonly status = "on ${servers} servers with ${users} users";

    constructor(client: Client) {
        this.client =  client;
    }

    public getTask(time: string): ScheduledTask {
        return schedule(time, () => this.updateUI());
    }

    private async updateUI(): Promise<void> {
        this.setActivity();

        const avatars = await DAO.Avatars.getNotActive();
        const avatar = avatars[Math.round(Math.random() * (avatars.length - 1))];

        this.client.user?.setAvatar(avatar.imageURL).then(async () => {
            Log.info("UserInterfaceUpdater.ts", "Avatar updated", { avatar: avatar });
            this.setNickname(avatar.name);
            await DAO.Avatars.switchActive(avatar.name);
            Log.info("UserInterfaceUpdater.ts", "Active avatar changed");
        }).catch(error => {
            Log.warning("UserInterfaceUpdater.ts", "Failed to update ui", { error: error });
        });
    }

    private async setActivity(): Promise<void> {
        const servers = await DAO.Servers.count();
        const users = await DAO.Users.count();
        let activity = this.status;
        activity = activity.replace("${servers}", servers.toString());
        activity = activity.replace("${users}", users.toString());
        if(this.client.user?.setActivity(activity))
            Log.info("UserInterfaceUpdater.ts", "Activity updated", {activity: activity});
    }

    private setNickname(nickname: string): void {
        this.client.guilds.cache.forEach(el => {
            el.me?.setNickname(nickname);
        });
        Log.info("UserInterfaceUpdater.ts", "Nickname updated", {nickname: nickname});
    }
};