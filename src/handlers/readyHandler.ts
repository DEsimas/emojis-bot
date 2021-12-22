import { UserInterfaceUpdater } from "../components/UserInterfaceUpdater.js";
import { NotificationsSender } from "../components/NotificationsSender.js";
import { Log } from "../Log.js";

import { Client } from "discord.js";

export class ReadyHandler {
    private readonly client: Client;

    private readonly cron: Record<string, string> = {
        notifications: "0 0 * * *",
        UI: "*/5 * * * *"
    }

    constructor(client: Client)  {
        Log.info("ReadyHandler.ts", "bot is ready");
        this.client = client;
    }

    public async handle(): Promise<void> {
        const sender = new NotificationsSender(this.client);
        sender.getTask(this.cron.notifications).start();

        const updater = new UserInterfaceUpdater(this.client);
        updater.getTask(this.cron.UI).start();
    }
};