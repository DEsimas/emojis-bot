import mongoose from "mongoose";

import Config from './../config.js';

export default class Notifications {
    constructor() {
        this.notifications = mongoose.model(Config.db_settings.db_collections.notifications, this.getNotificationsSchema());
    };

    getNotificationsSchema() {
        return new mongoose.Schema({
            userID: String,
            birth: Date,
            duration: Number
        });
    };

    //Notifications//
    async getAll() {
        return await this.notifications.find();
    };

    async getOne(userID) {
        return await this.notifications.findOne({ userID: userID });
    }

    async addOne(userID, birth, duration) {
        return await new this.notifications({ userID: userID, birth: birth, duration: duration }).save();
    };

    async deleteOne(userID) {
        return await this.notifications.deleteOne({ userID: userID });
    };
};