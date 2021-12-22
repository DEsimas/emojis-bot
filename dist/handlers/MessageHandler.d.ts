import { Client, Message } from "discord.js";
export declare class MessageHandler {
    private readonly client;
    private readonly message;
    constructor(client: Client, message: Message);
    handle(): Promise<void>;
}
