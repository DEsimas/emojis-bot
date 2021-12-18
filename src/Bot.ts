import { config } from 'dotenv';
import { Client, Intents } from 'discord.js';

export class Bot {
    private readonly client: Client;
    private readonly intents: number[];

    constructor() {
        config();

        this.intents = [
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.DIRECT_MESSAGES
        ];

        this.client = new Client({ intents: this.intents});
    }

    public login() {
        this.client.login(process.env.TOKEN);

        this.client.on("messageCreate", () => {console.log("uwu")})
    }
};