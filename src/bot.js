//libs
import { getAverageColor } from 'fast-average-color-node';
import asciify from "asciify-image";
import Discord from "discord.js";
import mongoose from "mongoose";
import nhentai from "nhentai";
import dotenv from "dotenv";
import R34 from "rule34js";
import fs from "fs";

//modules
import guildCreateHandler from "./handlers/guildCreateHandler.js";
import guildDeleteHandler from "./handlers/guildDeleteHandler.js";
import messageHandler from "./handlers/messageHandler.js";
import readyHandler from "./handlers/readyHandler.js";
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
        this.dao = new dao(config.db_settings);

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
        // this.client.on(this.config.events.ready, () => new readyHandler({ ...this }));
        this.client.on(config.events.guildCreate, guild => new guildCreateHandler({ ...options, guild: guild }));
        this.client.on(config.events.guildDelete, guild => new guildDeleteHandler({ ...options, guild: guild }));
        this.client.on("ready", () => console.log("less go"));
    };
};