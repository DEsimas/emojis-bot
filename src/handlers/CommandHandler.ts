import { Server } from "./../database/Servers";
import { User } from "./../database/Users";

import { Client, Message } from "discord.js";
import { commands } from "./../config/CommandsList";
import { commandsArray } from "../config/Types";

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
        if (this.message.author.id !== this.client.user?.id) {
            const content = this.message.content.trim();
            const args = content.split(" ");
            const command = args[0].toLowerCase();

            if(command.search(this.server.prefix) === -1) return;

            commandsArray.forEach(cmd => {
                commands[cmd].alias.forEach(alias => {
                    if (this.server.prefix + alias === command)
                        new commands[cmd].out(this.client, this.message, this.user, this.server, args, cmd).execute();
                });
            });
        };
    }
};