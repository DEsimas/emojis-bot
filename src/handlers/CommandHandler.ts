import { DeleteEmoji } from "../commands/DeleteEmoji";
import { SetLanguage } from "../commands/SetLanguage";
import { Unsubscribe } from "../commands/Unsubscribe";
import { ImgToAscII } from "../commands/ImgToAscII";
import { SetPrefix } from "../commands/SetPrefix";
import { Subscribe } from "../commands/Subscribe";
import { DoEmojis } from "../commands/DoEmojis";
import { SetEmoji } from "../commands/SetEmoji";
import { Clear } from "../commands/Clear";
import { Help } from "../commands/Help";

import { Command } from "../commands/_Command";
import { Server } from "../database/Servers";
import { User } from "../database/Users";
import { config } from "../config";

import { Client, Message } from "discord.js";

export class CommandHandler {
    private readonly client: Client;
    private readonly message: Message;
    private readonly user: User;
    private readonly server: Server;
    private readonly commands: Array<{ name: string[], out: typeof Command }> = [];

    constructor(client: Client, message: Message, user: User, server: Server) {
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server;
        this.setCommandsList(ImgToAscII, SetEmoji, DeleteEmoji, SetLanguage, SetPrefix, DoEmojis, Subscribe, Unsubscribe, Clear, Help);
    }

    public async handle(): Promise<void> {
        if (this.message.author.id !== this.client.user?.id) {
            const content = this.message.content.trim();
            const args = content.split(" ");
            const command = args[0].toLowerCase();
            
            this.commands.forEach(cmd => {
                cmd.name.forEach(name => {
                    if (this.server.prefix + name === command)
                        new cmd.out(this.client, this.message, this.user, this.server, args).execute();
                });
            });
        };
    }

    private setCommandsList(...commands: Array<typeof Command>): void {
        if(commands.length !== Object.keys(config.commands).length) throw new Error("CommandsHandler.ts: number of commands doesn't match the number of handlers");

        let k: keyof typeof config.commands, i: number = 0;
        for(k in config.commands){
            this.commands.push({
                name: config.commands[k],
                out: commands[i++]
            });
        }
    }
};