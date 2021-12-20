import { GuildCreateHandler } from './handlers/GuildCreateHandler';
import { GuildDeleteHandler } from './handlers/GuildDeleteHandler';
import { ReadyHandler } from './handlers/ReadyHandler';
import { config } from './config';
import { DAO } from './database/DAO';
import { Log } from './Log';

import { Client, Intents, Message } from 'discord.js';
import { config as dotenv } from 'dotenv';
import { MessageHandler } from './handlers/MessageHandler';
import { User } from './database/Users';
import { Server } from './database/Servers';

export class Bot {
    private readonly DAO: DAO;
    private readonly client: Client;
    private readonly intents: number[];

    constructor() {
        dotenv();

        this.DAO = new DAO();

        this.intents = [
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.DIRECT_MESSAGES
        ];

        this.client = new Client({ intents: this.intents});
    }

    public connectDB(uri?: string): Promise<void> {
        return this.DAO.connect(uri || process.env.MONGO || "");
    }

    public login(token?: string): void {
        this.client.login(token || process.env.TOKEN).then(token => {
            Log.info(`Bot.ts:\tlogged in with token: ${token}`);
        }).catch(error => {
            Log.error(`Bot.ts:\tfailed to log in\n${error}`);
        });

        this.client.on(config.events.ready, () => new ReadyHandler(this.client, this.DAO).handle());
        this.client.on(config.events.message, async (message: Message) => {new MessageHandler(this.client, this.DAO, message, await this.fetchUser(message.author.id), await this.fentchServer(message.guild?.id)).handle()});
        this.client.on(config.events.guildCreate, guild => new GuildCreateHandler(this.client, this.DAO, guild ).handle());
        this.client.on(config.events.guildDelete, guild => new GuildDeleteHandler(this.DAO, guild).handle());
    }

    private async fetchUser(userID: string): Promise<User> {
        const user = await this.DAO.Users.findByUserId(userID);
        if(user === null) return this.DAO.Users.insertOne({
            userID: userID,
            emojiID: config.database.defaults.emoji,
            language: config.database.defaults.language
        });
        return user;
    }

    private async fentchServer(serverID: string | undefined): Promise<Server | null> {
        if(serverID === undefined) return null;
        const server = await this.DAO.Servers.findByServerId(serverID);
        if(server === null) return this.DAO.Servers.insertOne({
            serverID: serverID,
            doEmojis: config.database.defaults.doEmojis,
            prefix: config.database.defaults.prefix
        });
        return server;
    }
};