import { Client } from "discord.js";
export declare class ReadyHandler {
    private readonly client;
    private readonly cron;
    constructor(client: Client);
    handle(): Promise<void>;
}
