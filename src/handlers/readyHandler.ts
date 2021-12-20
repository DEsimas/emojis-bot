import { UserInterfaceUpdater } from "../components/UserInterfaceUpdater";
import { NotificationsSender } from "../components/NotificationsSender";
import { AvatarsRefresher } from "../components/AvatarsRefresher";
import { DAO } from "../database/DAO";
import { config } from "../config";
import { Log } from "../Log";

import { Client } from "discord.js";

export class ReadyHandler {

    private readonly client: Client;

    constructor(client: Client)  {
        Log.info("ReadyHandler.ts:\tbot is ready");
        this.client = client;
    }

    public async handle(): Promise<void> {
        const sender = new NotificationsSender(this.client);
        sender.getTask(config.cron.notifications).start();

        const updater = new UserInterfaceUpdater(this.client);
        updater.getTask(config.cron.UI).start();

        const refresher = new AvatarsRefresher(this.client);
        refresher.getTask(config.cron.avatars).start();
    }
};