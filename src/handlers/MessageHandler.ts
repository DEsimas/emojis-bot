import { Client, Message } from "discord.js";
import { Server } from "../database/Servers";
import { User } from "../database/Users";
import { DAO } from "../database/DAO";
import { Log } from "../Log";
import { config } from "../config";
import { CommandHandler } from "./CommandHandler";

export class MessageHandler {
    private readonly client: Client;
    private readonly message: Message;

    constructor(client: Client, message: Message) {
        this.client = client;
        this.message = message;
    }
    
    public async handle(): Promise<void> {
        const user = await this.fetchUser(this.message.author.id);
        const server = await this.fentchServer(this.message.guild?.id);

        if(server === null) {
            Log.warning("MessageHandler.ts", "Couldn't save server to the database");
            return;
        }

        if(server.doEmojis && user.emojiID) {
            if(this.message.author.id !== this.client.user?.id) {
                this.message.react(user.emojiID);
            } else {
                const avatar = await DAO.Avatars.getActive();
                if(avatar) {
                    this.message.react(avatar.emojiID);
                }
            }
        }
        const commandHandler = new CommandHandler(this.client, this.message, user, server);
        commandHandler.handle();
    }

    private async fetchUser(userID: string): Promise<User> {
        const user = await DAO.Users.findByUserId(userID);
        if(user === null) return DAO.Users.insertOne({
            userID: userID,
            emojiID: config.database.defaults.emoji,
            language: config.database.defaults.language
        });
        return user;
    }

    private async fentchServer(serverID: string | undefined): Promise<Server | null> {
        if(serverID === undefined) return null;
        const server = await DAO.Servers.findByServerId(serverID);
        if(server === null) return DAO.Servers.insertOne({
            serverID: serverID,
            doEmojis: config.database.defaults.doEmojis,
            prefix: config.database.defaults.prefix
        });
        return server;
    }
};