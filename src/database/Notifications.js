import mongoose from "mongoose";

import Config from './../config.js';

export default class Notifications {
    constructor() {
        this.notifications = mongoose.model(Config.db_settings.db_collections.notifications, this.getNotificationsSchema());
    };

    getNotificationsSchema() {
        return new mongoose.Schema({
            userID: Number,
            birth: Date,
            duration: Number
        });
    };

    //Notifications//
    async getAll() {
        return await this.notifications.find();
    };

    async addOne(userID, date, duration) {
        return await new this.notifications({ userID: userID, date: date, duration: duration }).save();
    };

    async deleteOne(userID) {
        return await this.servers.deleteOne({ userID: userID });
    };
};