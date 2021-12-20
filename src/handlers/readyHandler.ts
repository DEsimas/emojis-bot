import { NotificationsSender } from "../components/NotificationsSender";
import { DAO } from "../database/DAO";
import { config } from "../config";
import { Log } from "../Log";

import { UserInterfaceUpdater } from "../components/UserInterfaceUpdater";
import { Client } from "discord.js";

export class ReadyHandler {

    private readonly DAO: DAO;
    private readonly client: Client;

    constructor(client: Client, DAO: DAO)  {
        Log.info("ReadyHandler.ts:\tbot is ready");

        this.DAO = DAO;
        this.client = client;
    }

    public async handle(): Promise<void> {
        const sender = new NotificationsSender(this.client, this.DAO);
        sender.getTask(config.cron.notifications).start();

        const updater = new UserInterfaceUpdater(this.client, this.DAO);
        updater.getTask(config.cron.UI).start();
    }
};