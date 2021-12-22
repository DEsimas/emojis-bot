import { Client } from "discord.js";
import { ScheduledTask } from 'node-cron';
export declare class NotificationsSender {
    private readonly client;
    private readonly embed_color;
    constructor(client: Client);
    getTask(time: string): ScheduledTask;
    private sendNotifications;
    private getDifference;
}
