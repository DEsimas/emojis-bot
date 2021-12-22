import { Client } from "discord.js";
import { ScheduledTask } from "node-cron";
export declare class UserInterfaceUpdater {
    private readonly client;
    private readonly status;
    constructor(client: Client);
    getTask(time: string): ScheduledTask;
    private updateUI;
    private setActivity;
    private setNickname;
}
