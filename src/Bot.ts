import { guildCreateHandler } from './handlers/guildCreateHandler';
import { guildDeleteHandler } from './handlers/guildDeleteHandler';
import { readyHandler } from './handlers/readyHandler';
import { Config, config } from './config';
import { DAO } from './database/DAO';
import { Log } from './Log';

import { Client, Intents } from 'discord.js';
import { config as dotenv } from 'dotenv';

export class Bot {
    private readonly DAO: DAO;
    private readonly client: Client;
    private readonly config: Config;
    private readonly intents: number[];

    constructor() {
        dotenv();

        this.DAO = new DAO();
        this.config = config;

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
            Log.info(`Logged in with token: ${token}`);
        }).catch(error => {
            Log.error(`Failed to log in\n${error}`);
        });

        this.client.on(this.config.events.ready, () => new readyHandler(this.client, this.DAO).handle());
        this.client.on(this.config.events.message, () => {console.log('message')});
        this.client.on(this.config.events.guildCreate, guild => new guildCreateHandler(this.client, this.DAO, guild ).handle());
        this.client.on(this.config.events.guildDelete, guild => new guildDeleteHandler(this.DAO, guild).handle());
    }
};