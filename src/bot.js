//libs
// import ImgToAscII from "image-to-ascii";
import Discord from "discord.js";
import mongoose from "mongoose";
import nhentai from "nhentai";
import dotenv from "dotenv";

//modules
import messageHandler from "./messageHandler.js";
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
        // this.ImgToAscII = ImgToAscII;
        this.nhentai = nhentai;
        this.Discord = Discord;
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
        this.client.on(this.config.events.ready, () => this.onReady());
        this.client.on(this.config.events.message, message => this.onMessage(message));
        this.client.on(this.config.events.guildCreate, guild => this.onGuildCreate(guild));
        this.client.on(this.config.events.guildDelete, guild => this.onGuildDelete(guild));
    };

    //handlers//
    onReady() {
        console.log(this.config.log.ready);
    };

    onMessage(message) {
        new messageHandler( { ...this, message: message } );
    };

    onGuildCreate(guild) {
        this.dao.delServer(guild.id);
    };

    onGuildDelete(guild) {
        this.dao.delServer(guild.id);
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