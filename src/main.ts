import { Intents } from 'discord.js';
import { config } from 'dotenv';
import { Bot, Options } from './Bot';
import { DAO } from './database/DAO';
import { GuildCreateHandler } from './handlers/guildCreateHandler';
import { GuildDeleteHandler } from './handlers/GuildDeleteHandler';
import { MessageHandler } from './handlers/MessageHandler';
import { ReadyHandler } from "./handlers/ReadyHandler";
import { EventHandler } from './handlers/_EventHandler';
import { Log } from './Log';

async function main() {
    config();

    if(process.env.MONGO === undefined) throw new Error("Database uri not found in enviorment");

    DAO.connect(process.env.MONGO);

    if(process.env.TOKEN === undefined) {
        Log.error("main.ts", "Bot token not found in enviorment");
        throw new Error("Bot token not found in enviorment");
    }

    const events: Record<string, typeof EventHandler> = {
        ready: ReadyHandler,
        messageCreate: MessageHandler,
        guildCreate: GuildCreateHandler,
        guildDelete: GuildDeleteHandler
    };

    const intents = [
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES
    ];

    const options: Options = {
        token: process.env.TOKEN,
        intents: intents,
        events: events
    }

    new Bot(options).login();
}

main();