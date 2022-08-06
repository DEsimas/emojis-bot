import { GuildCreateHandler } from './handlers/events/GuildCreateHandler';
import { GuildDeleteHandler } from './handlers/events/GuildDeleteHandler';
import { GuildMemberAdd } from './handlers/events/GuildMemberAdd';
import { MessageHandler } from './handlers/events/MessageHandler';
import { ReadyHandler } from './handlers/events/ReadyHandler';
import { DAO } from './database/DAO';
import { Log } from './components/Log';

import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { GuildMemberRemove } from './handlers/events/GuildMemberRemove';

export class Bot {
    private readonly token: string;
    private readonly mongo_uri: string;
    private readonly client: Client;
    private readonly intents: number[];
    private readonly partials: Partials[];

    private readonly events = {
        ready: "ready",
        message: "messageCreate",
        guildCreate: "guildCreate",
        guildDelete: "guildDelete",
        guildMemberAdd: "guildMemberAdd",
        guildMemberRemove: "guildMemberRemove"
    }

    constructor(data: {token: string, mongo_uri: string}) {
        this.token = data.token;
        this.mongo_uri = data.mongo_uri;

        this.intents = [
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent
        ];

        this.partials = [
            Partials.Channel
        ];

        this.client = new Client({ partials: this.partials, intents: this.intents});
    }

    public start(): void {
        this.connectDB(this.mongo_uri);
        this.login(this.token);
    }

    private connectDB(uri?: string): Promise<void> {
        return DAO.connect(uri || process.env.MONGO || "");
    }

    private login(token?: string): void {
        this.client.login(token || process.env.TOKEN).then(token => {
            Log.info("Bot.ts", `logged in`, { token: token });
        }).catch(error => {
            Log.error("Bot.ts", "failed to log in", {token: token, error: error});
        });

        this.client.on(this.events.ready, () => new ReadyHandler(this.client).handle());
        this.client.on(this.events.message, message => new MessageHandler(this.client, message).handle());
        this.client.on(this.events.guildCreate, guild => new GuildCreateHandler(this.client, guild ).handle());
        this.client.on(this.events.guildDelete, guild => new GuildDeleteHandler(guild).handle());
        this.client.on(this.events.guildMemberAdd, member => new GuildMemberAdd(member).handle());
        this.client.on(this.events.guildMemberRemove, member => new GuildMemberRemove(member).handle());
    }
};