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
exports.GuildCreateHandler = void 0;
const DAO_1 = require("../database/DAO");
class GuildCreateHandler {
    constructor(client, guild) {
        this.support_server = "885941024478883870";
        this.guild = guild;
        this.client = client;
    }
    handle() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            DAO_1.DAO.Servers.insertNew(this.guild.id);
            (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.setNickname(yield this.getNickname());
        });
    }
    getNickname() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const support_guild = yield this.client.guilds.fetch(this.support_server);
            return ((_a = support_guild.me) === null || _a === void 0 ? void 0 : _a.nickname) || "emojis-bot";
        });
    }
}
exports.GuildCreateHandler = GuildCreateHandler;
;
//# sourceMappingURL=GuildCreateHandler.js.map