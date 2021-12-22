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
exports.Avatars = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = require("../config/Database");
;
class Avatars {
    constructor() {
        this.AvatarsModel = (0, mongoose_1.model)(Database_1.collections.avatars, this.getAvatarSchema());
    }
    getAvatarSchema() {
        return new mongoose_1.Schema({
            name: String,
            imageURL: String,
            emojiID: String,
            color: String,
            active: Boolean
        });
    }
    ;
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.countDocuments();
        });
    }
    switchActive(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AvatarsModel.updateOne({ active: true }, { active: false });
            return this.AvatarsModel.updateOne({ name: name }, { active: true });
        });
    }
    getActive() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.findOne({ active: true });
        });
    }
    getNotActive() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.find({ active: false });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.find({});
        });
    }
    insertOne(avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this.AvatarsModel(avatar).save();
        });
    }
    insertMany(avatars) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.insertMany(avatars);
        });
    }
    updateOneByName(name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.updateOne({ name: name }, options);
        });
    }
    deleteOneById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.deleteOne({ _id: _id });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.AvatarsModel.deleteMany({});
        });
    }
}
exports.Avatars = Avatars;
//# sourceMappingURL=Avatars.js.map