import mongoose from "mongoose";

import Config from "./../config.js";
import Log from "./../logger.js";

import Users from "./Users.js";
import Servers from "./Servers.js";
import Avatars from "./Avatars.js";

export default class DAO {
    static init() {
        this.Users = new Users();
        this.Servers = new Servers();
        this.Avatars = new Avatars();
    
        this.connectDB();
    }

    //connecting db with uri from .env
    static async connectDB() {
        await mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
        Log.info(Config.db_settings.log.db);
    };
    
    //setting default values for other bots
    static setDefaults() {
        Config.db_settings.default_values.forEach(async el => {
            const data = await this.Users.getOne(el.userID);
            if(data === null) {
                await this.Users.addOne(el.userID, el.emojiID, el.language);
                return;
            };
            if (JSON.stringify({ userID: data.userID, emojiID: data.emojiID, language: data.language }) != JSON.stringify(el)) {
                await this.Users.deleteOne(el.userID);
                await this.Users.addOne(el.userID, el.emojiID, el.language);
            };
        });
    };
};