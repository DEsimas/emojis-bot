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
exports.Notifications = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = require("../config/Database");
;
class Notifications {
    constructor() {
        this.NotificationModel = (0, mongoose_1.model)(Database_1.collections.notifications, this.getNotificationSchema());
    }
    getNotificationSchema() {
        return new mongoose_1.Schema({
            userID: String,
            birth: Date
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.NotificationModel.find({});
        });
    }
    findByUserId(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.NotificationModel.findOne({ userID: userID });
        });
    }
    insertOne(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this.NotificationModel(notification).save();
        });
    }
    deleteByUserId(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.NotificationModel.deleteOne({ userID: userID })).deletedCount === 1)
                return true;
            return false;
        });
    }
}
exports.Notifications = Notifications;
;
//# sourceMappingURL=Notifications.js.map