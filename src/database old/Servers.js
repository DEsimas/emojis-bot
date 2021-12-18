import mongoose from "mongoose";

import Config from './../config.js';

export default class Servers {
    constructor() {
        this.servers = mongoose.model(Config.db_settings.db_collections.servers, this.getServerSchema());
    };

    getServerSchema() {
        return new mongoose.Schema({
            serverID: String,
            doEmojis: Boolean,
            prefix: String,
            memeChannel: String
        });
    };

    //Servers//
    async getOne(serverID) {
        return await this.servers.findOne({ serverID: serverID });
    };

    async getAll() {
        return await this.servers.find();
    };

    async addOne(serverID, doEmojis, prefix) {
        return await new this.servers({ serverID: serverID, doEmojis: doEmojis, prefix: prefix }).save();
    };

    async updateOne(serverID, options) {
        return await this.servers.updateOne({ serverID: serverID }, options);
    };

    async deleteOne(serverID) {
        return await this.servers.deleteOne({ serverID: serverID });
    };
};