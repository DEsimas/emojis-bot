import { GuildCreateHandler } from './handlers/GuildCreateHandler';
import { GuildDeleteHandler } from './handlers/GuildDeleteHandler';
import { MessageHandler } from './handlers/MessageHandler';
import { ReadyHandler } from './handlers/ReadyHandler';
import { DAO } from './database/DAO';
import { config } from './config';
import { Log } from './Log';

import { Client, Intents } from 'discord.js';
import { config as dotenv } from 'dotenv';

export class Bot {
    private readonly client: Client;
    private readonly intents: number[];

    constructor() {
        dotenv();

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
        return DAO.connect(uri || process.env.MONGO || "");
    }

    public login(token?: string): void {
        this.client.login(token || process.env.TOKEN).then(token => {
            Log.info("Bot.ts", `logged in`, { token: token });
        }).catch(error => {
            Log.error("Bot.ts", "failed to log in", {token: token, error: error});
        });

        this.client.on(config.events.ready, () => new ReadyHandler(this.client).handle());
        this.client.on(config.events.message, message => new MessageHandler(this.client, message).handle());
        this.client.on(config.events.guildCreate, guild => new GuildCreateHandler(this.client, guild ).handle());
        this.client.on(config.events.guildDelete, guild => new GuildDeleteHandler(guild).handle());
    }
};