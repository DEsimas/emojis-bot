//libs
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
        this.config = config;
        dotenv.config();

        this.config.db_settings.mongoose = mongoose;
        this.dao = new dao(this.config.db_settings);

        this.setLibs();
        this.setFunctions();

        this.setClient();
        this.setEndpoints();
    };

    //set imported packages in this
    setLibs() {
        this.asciify = asciify;
        this.nhentai = nhentai;
        this.Discord = Discord;
        this.R34 = R34;
        this.fs = fs;
    };

    //set common functions in this
    setFunctions() {
        this.sendError = this.sendError;
        this.sendSuccess = this.sendSuccess;
    };

    //login bot using token from config
    setClient() {
        this.client = new this.Discord.Client();
        this.client.login(process.env.TOKEN);
    };

    //set handlers for events
    setEndpoints() {
        this.client.on(this.config.events.ready, () => new readyHandler({ ...this }));
        this.client.on(this.config.events.message, message => new messageHandler({ ...this, message: message }));
        this.client.on(this.config.events.guildCreate, guild => new guildCreateHandler({ ...this, guild: guild }));
        this.client.on(this.config.events.guildDelete, guild => new guildDeleteHandler({ ...this, guild: guild }));
    };
    
    //common functions//
    sendError(context, error) {
        const embed = new context.Discord.MessageEmbed()
            .setColor(context.config.error_color)
            .setTitle(error);
        context.message.channel.send(embed);
    };

    sendSuccess(context, success) {
        const embed = new context.Discord.MessageEmbed()
            .setColor(context.config.success_color)
            .setTitle(success);
        context.message.channel.send(embed);
    };
};