import { GuildCreateHandler } from './handlers/GuildCreateHandler';
import { GuildDeleteHandler } from './handlers/GuildDeleteHandler';
import { ReadyHandler } from './handlers/ReadyHandler';
import { config } from './config';
import { DAO } from './database/DAO';
import { Log } from './Log';

import { Client, Intents } from 'discord.js';
import { config as dotenv } from 'dotenv';

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
        this.client.on(config.events.message, () => {console.log('message')});
        this.client.on(config.events.guildCreate, guild => new GuildCreateHandler(this.client, this.DAO, guild ).handle());
        this.client.on(config.events.guildDelete, guild => new GuildDeleteHandler(this.DAO, guild).handle());
    }
};