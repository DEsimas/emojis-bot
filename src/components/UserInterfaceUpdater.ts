import { config, Config } from "../config";
import { DAO } from "../database/DAO";
import { Log } from "../Log";

import { Client } from "discord.js";
import { schedule, ScheduledTask } from "node-cron";

export class UserInterfaceUpdater {
    private readonly DAO: DAO;
    private readonly client: Client;
    private readonly config: Config;

    constructor(client: Client, DAO: DAO) {
        this.DAO = DAO;
        this.client =  client;
        this.config = config;
    }

    public getTask(time: string): ScheduledTask {
        return schedule(time, () => this.updateUI());
    }

    private async updateUI(): Promise<void> {
        this.setActivity();

        const avatars = await this.DAO.Avatars.getNotActive();
        const avatar = avatars[Math.round(Math.random() * (avatars.length - 1))];

        this.client.user?.setAvatar(avatar.imageURL).then(async () => {
            Log.info(`UserInterfaceUpdater.ts:\tavatar updated ${avatar.imageURL}`);
            this.setNickname(avatar.name);
            await this.DAO.Avatars.switchActive(avatar.name);
            Log.info(`UserInterfaceUpdater.ts:\tavatar in db updated`);
        }).catch(error => {
            Log.warning(`UserInterfaceUpdater.ts:\tcan't update UI\n${error}`);
        });
    }

    private async setActivity(): Promise<void> {
        const servers = await this.DAO.Servers.count();
        const users = await this.DAO.Users.count();
        let activity = this.config.status;
        activity = activity.replace("${servers}", servers.toString());
        activity = activity.replace("${users}", users.toString());
        if(this.client.user?.setActivity(activity))
            Log.info(`UserInterfaceUpdater.ts:\tactivity updated: ${activity}`);
    }

    private setNickname(nickname: string): void {
        this.client.guilds.cache.forEach(el => {
            el.me?.setNickname(nickname);
        });
        Log.info(`UserInterfaceUpdater.ts:\tnickname updated: ${nickname}`);
    }
};