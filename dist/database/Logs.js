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
exports.Logs = void 0;
const mongoose_1 = require("mongoose");
const Database_1 = require("../config/Database");
;
class Logs {
    constructor() {
        this.LogsModel = (0, mongoose_1.model)(Database_1.collections.logs, this.getLogSchema());
    }
    getLogSchema() {
        return new mongoose_1.Schema({
            type: String,
            time: Date,
            origin: String,
            message: String,
            payload: String
        });
    }
    insertOne(log) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this.LogsModel(log).save();
        });
    }
}
exports.Logs = Logs;
//# sourceMappingURL=Logs.js.map