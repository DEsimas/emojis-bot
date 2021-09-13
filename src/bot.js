//external libs
import Discord from "discord.js";
import dotenv from "dotenv";

//events handlers
import guildCreateHandler from "./handlers/guildCreateHandler.js";
import guildDeleteHandler from "./handlers/guildDeleteHandler.js";
import messageHandler from "./handlers/messageHandler.js";
import readyHandler from "./handlers/readyHandler.js";

//data access object
import dao from "./dao.js";

//config
import config from "./config.js";

export default class bot {
    constructor() {
        //set proccess.env
        dotenv.config();

        //get intents
        const Intents = Discord.Intents.FLAGS;
        this.intents = {
            intents: [Intents.GUILD_EMOJIS_AND_STICKERS, Intents.GUILD_MESSAGES, Intents.GUILD_MESSAGE_REACTIONS, Intents.GUILDS]
        };
        
        //connect to the data base
        this.dao = new dao();

        this.setClient();
        this.setEndpoints();
    };

    //login bot using token from .env
    setClient() {
        this.client = new Discord.Client(this.intents);
        this.client.login(process.env.TOKEN);
    };

    //set handlers for events
    setEndpoints() {
        //default arguments
        const options = { dao: this.dao, client: this.client }

        this.client.on(config.events.message, message => new messageHandler({ ...options,  message: message }));
        this.client.on(config.events.ready, () => new readyHandler(options));
        this.client.on(config.events.guildCreate, guild => new guildCreateHandler({ ...options, guild: guild }));
        this.client.on(config.events.guildDelete, guild => new guildDeleteHandler({ ...options, guild: guild }));
    };
};