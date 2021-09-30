import mongoose from "mongoose";

import Config from './../config.js';

export default class Users {
    constructor() {
        this.users = mongoose.model(Config.db_settings.db_collections.users, this.getUserSchema());
    };
    
    getUserSchema() {
        return new mongoose.Schema({
            userID: String,
            emojiID: String,
            language: String
        });
    };

    //Users//
    async getOne(userID) {
        return await this.users.findOne({ userID: userID });
    };

    async getAll() {
        return await this.users.find();
    };

    async addOne(userID, emojiID, language) {
        return await new this.users({ userID: userID, emojiID: emojiID, language: language }).save();
    };

    async updateOne(userID, options) {
        return await this.users.updateOne({ userID: userID }, options);
    };

    async deleteOne(userID) {
        return await this.users.deleteOne({ userID: userID });
    };
};