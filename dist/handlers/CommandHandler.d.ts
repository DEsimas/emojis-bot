import { Server } from "../database/Servers";
import { User } from "../database/Users";
import { Client, Message } from "discord.js";
export declare class CommandHandler {
    private readonly client;
    private readonly message;
    private readonly user;
    private readonly server;
    constructor(client: Client, message: Message, user: User, server: Server);
    handle(): Promise<void>;
}
