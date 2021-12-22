"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const GuildCreateHandler_1 = require("./handlers/GuildCreateHandler");
const GuildDeleteHandler_1 = require("./handlers/GuildDeleteHandler");
const MessageHandler_1 = require("./handlers/MessageHandler");
const ReadyHandler_1 = require("./handlers/ReadyHandler");
const DAO_1 = require("./database/DAO");
const Log_1 = require("./Log");
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
class Bot {
    constructor() {
        this.events = {
            ready: "ready",
            message: "messageCreate",
            guildCreate: "guildCreate",
            guildDelete: "guildDelete"
        };
        (0, dotenv_1.config)();
        this.intents = [
            discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.DIRECT_MESSAGES
        ];
        this.client = new discord_js_1.Client({ intents: this.intents });
    }
    connectDB(uri) {
        return DAO_1.DAO.connect(uri || process.env.MONGO || "");
    }
    login(token) {
        this.client.login(token || process.env.TOKEN).then(token => {
            Log_1.Log.info("Bot.ts", `logged in`, { token: token });
        }).catch(error => {
            Log_1.Log.error("Bot.ts", "failed to log in", { token: token, error: error });
        });
        this.client.on(this.events.ready, () => new ReadyHandler_1.ReadyHandler(this.client).handle());
        this.client.on(this.events.message, message => new MessageHandler_1.MessageHandler(this.client, message).handle());
        this.client.on(this.events.guildCreate, guild => new GuildCreateHandler_1.GuildCreateHandler(this.client, guild).handle());
        this.client.on(this.events.guildDelete, guild => new GuildDeleteHandler_1.GuildDeleteHandler(guild).handle());
    }
}
exports.Bot = Bot;
;
//# sourceMappingURL=Bot.js.map