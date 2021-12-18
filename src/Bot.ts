import { config } from './config';
import { config as dotenv } from 'dotenv';
import { Client, Intents } from 'discord.js';
import { DAO } from './database/DAO';
import { ObjectId } from 'mongoose';

export class Bot {
    private readonly DAO: DAO;
    private readonly client: Client;
    private readonly intents: number[];
    private readonly config: typeof config;

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

    public async connectDB(uri?: string): Promise<Bot> {
        await this.DAO.connect(uri || process.env.MONGO || "");
        console.log(await this.DAO.Avatars.deleteAll());
        return this;
    }

    public login(token?: string): Bot {
        this.client.login(token || process.env.TOKEN);

        this.client.on(this.config.events.ready, () => {console.log('ready')});
        this.client.on(this.config.events.message, () => {console.log('message')});
        this.client.on(this.config.events.guildCreate, () => {console.log('new guild')});
        this.client.on(this.config.events.guildDelete, () => {console.log('guild deleted')});

        return this;
    }

    public async test() {
        console.log(await this.DAO.Avatars.getAll());
    }
};