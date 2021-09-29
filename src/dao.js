import mongoose from "mongoose";
import config from "./config.js";

export default class dao {
    constructor() {
        //set collections models
        this.emojis = mongoose.model(config.db_settings.db_collections.users, this.getUserSchema());
        this.servers = mongoose.model(config.db_settings.db_collections.servers, this.getServerSchema());
        this.avatars = mongoose.model(config.db_settings.db_collections.avatars, this.getAvatarSchema());

        this.connectDB();
    };

    //connecting db with uri from .env
    connectDB() {
        mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log(config.db_settings.log.db)
                this.setDefaults();
            })
            .catch(error => console.log(config.db_settings.log.db_error + error));
    };
    
    //setting default values for other bots
    setDefaults() {
        config.db_settings.default_values.forEach(async el => {
            const data = await this.getUser(el.userID);
            if(data === null) {
                await this.addUser(el.userID, el.emojiID, el.language);
                return;
            };
            if (JSON.stringify({ userID: data.userID, emojiID: data.emojiID, language: data.language }) != JSON.stringify(el)) {
                await this.delUser(el.userID);
                await this.addUser(el.userID, el.emojiID, el.language);
            };
        });
    };

    //schemas for collections//
    getUserSchema() {
        return new mongoose.Schema({
            userID: String,
            emojiID: String,
            language: String
        });
    };

    getServerSchema() {
        return new mongoose.Schema({
            serverID: String,
            doEmojis: Boolean,
            prefix: String,
            memeChannel: String
        });
    };

    getAvatarSchema() {
        return new mongoose.Schema({
            name: String,
            imageURL: String,
            emojiID: String,
            color: String,
            active: Boolean
        });
    };

    //interaction methods//
    //Users//
    async addUser(userID, emojiID, language) {
        return await new this.emojis({ userID: userID, emojiID: emojiID, language: language }).save();
    };

    async getUsers() {
        return await this.emojis.find();
    };

    async getUser(userID) {
        return await this.emojis.findOne({ userID: userID });
    };

    async updUser(userID, options) {
        return await this.emojis.updateOne({ userID: userID }, options);
    };

    async delUser(userID) {
        return await this.emojis.deleteOne({ userID: userID });
    };

    //Servers//
    async addServer(serverID, doEmojis, prefix) {
        return await new this.servers({ serverID: serverID, doEmojis: doEmojis, prefix: prefix }).save();
    };

    async getServers() {
        return await this.servers.find();
    };

    async getServer(serverID) {
        return await this.servers.findOne({ serverID: serverID });
    };

    async updServer(serverID, options) {
        return await this.servers.updateOne({ serverID: serverID }, options);
    };

    async delServer(serverID) {
        return await this.servers.deleteOne({ serverID: serverID });
    };

    //Avatars//
    async addAvatar(name, imageURL, emojiID, color, active) {
        return await this.avatars({ name: name, imageURL: imageURL, emojiID:emojiID, color: color, active:active }).save();
    };

    async getAvatars() {
        return await this.avatars.find();
    };
    
    async getAvatar() {
        return await this.avatars.findOne({ active: true });
    };
    
    async updAvatar(name, options) {
        return await this.avatars.updateOne({ name: name }, options);
    };

    async delAvatar(_id) {
        return await this.avatars.deleteOne({ _id: _id });
    };

    async delAvatars() {
        return await this.avatars.deleteMany({});
    };
};