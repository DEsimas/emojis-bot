import mongoose from "mongoose";

import Config from './../config.js';

export default class Avatars {
    constructor() {
        this.avatars = mongoose.model(Config.db_settings.db_collections.avatars, this.getAvatarSchema());
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

    //Avatars//
    async getActive() {
        return await this.avatars.findOne({ active: true });
    };

    async getAll() {
        return await this.avatars.find();
    };
    
    async addOne(name, imageURL, emojiID, color, active) {
        return await this.avatars({ name: name, imageURL: imageURL, emojiID:emojiID, color: color, active:active }).save();
    };

    async updateOne(name, options) {
        return await this.avatars.updateOne({ name: name }, options);
    };

    async deleteOne(_id) {
        return await this.avatars.deleteOne({ _id: _id });
    };

    async deleteAll() {
        return await this.avatars.deleteMany({});
    };
};