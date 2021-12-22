"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servers = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = require("../config/Database");
;
class Servers {
    constructor() {
        this.ServersModel = (0, mongoose_1.model)(Database_1.collections.servers, this.getServerSchema());
    }
    getServerSchema() {
        return new mongoose_1.Schema({
            serverID: String,
            doEmojis: Boolean,
            prefix: String
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServersModel.countDocuments({});
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServersModel.find({});
        });
    }
    fetchByServerId(serverID) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.ServersModel.findOne({ serverID: serverID });
            if (server)
                return server;
            return this.insertNew(serverID);
        });
    }
    insertNew(serverID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.insertOne(Object.assign({ serverID: serverID }, Database_1.server));
        });
    }
    insertOne(server) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this.ServersModel(server).save();
        });
    }
    updateOneByServerId(serverID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ServersModel.updateOne({ serverID: serverID }, options);
        });
    }
    deleteOneByServerId(serverID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ServersModel.deleteOne({ serverID: serverID });
        });
    }
}
exports.Servers = Servers;
//# sourceMappingURL=Servers.js.map