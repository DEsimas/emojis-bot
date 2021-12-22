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
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = require("../config/Database");
;
class Users {
    constructor() {
        this.UsersModel = (0, mongoose_1.model)(Database_1.collections.users, this.getUserSchema());
    }
    getUserSchema() {
        return new mongoose_1.Schema({
            userID: String,
            emojiID: String || null,
            language: String
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersModel.countDocuments({});
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersModel.find({});
        });
    }
    fetchByUserId(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UsersModel.findOne({ userID: userID });
            if (user)
                return user;
            return this.insertOne(Object.assign({ userID: userID }, Database_1.user));
        });
    }
    insertOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this.UsersModel(user).save();
        });
    }
    updateByUserId(userID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersModel.updateOne({ userID: userID }, options);
        });
    }
    deleteByUserId(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersModel.deleteOne({ userID: userID });
        });
    }
}
exports.Users = Users;
;
//# sourceMappingURL=Users.js.map