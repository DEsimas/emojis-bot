import { Client, Message } from "discord.js";
import { Server } from "../database/Servers";
import { User } from "../database/Users";

export class CommandHandler {
    private readonly client: Client;
    private readonly message: Message;
    private readonly user: User;
    private readonly server: Server;

    constructor(client: Client, message: Message, user: User, server: Server) {
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server;
    }

    public async handle(): Promise<void> {
        console.log("handling command ....");
    }
};