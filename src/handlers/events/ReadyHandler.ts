import { UserInterfaceUpdater } from "./../../components/UserInterfaceUpdater";
import { NotificationsSender } from "./../../components/NotificationsSender";

import { Log } from "./../../components/Log";
import { Handler } from "./../Handler";

import { Client } from "discord.js";

export class ReadyHandler extends Handler {
    private readonly client: Client;

    private readonly cron: Record<string, string> = {
        notifications: "0 0 * * *",
        UI: "*/5 * * * *",
        stateExamCounter: "0 7 * * *"
    }

    constructor(client: Client)  {
        super();
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