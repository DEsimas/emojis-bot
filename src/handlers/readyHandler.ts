import { NotificationsSender } from "../components/NotificationsSender";
import { Config, config } from "../config";
import { DAO } from "../database/DAO";
import { Log } from "../Log";

import { UserInterfaceUpdater } from "../components/UserInterfaceUpdater";
import { Client } from "discord.js";

export class ReadyHandler {

    private readonly DAO: DAO;
    private readonly client: Client;
    private readonly config: Config;

    constructor(client: Client, DAO: DAO)  {
        Log.info("ReadyHandler.ts:\tbot is ready");

        this.DAO = DAO;
        this.client = client;
        this.config = config;
    }

    public async handle(): Promise<void> {
        const sender = new NotificationsSender(this.client, this.DAO);
        sender.getTask(this.config.cron.notifications).start();

        const updater = new UserInterfaceUpdater(this.client, this.DAO);
        updater.getTask(this.config.cron.UI).start();
    }
};