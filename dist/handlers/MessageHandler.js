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
exports.MessageHandler = void 0;
const DAO_1 = require("../database/DAO");
const Log_1 = require("../Log");
const CommandHandler_1 = require("./CommandHandler");
class MessageHandler {
    constructor(client, message) {
        this.client = client;
        this.message = message;
    }
    handle() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.message.guild === null) {
                Log_1.Log.warning("MessageHandler.ts", "Guld in message is null", { message: this.message });
                return;
            }
            const user = yield DAO_1.DAO.Users.fetchByUserId(this.message.author.id);
            const server = yield DAO_1.DAO.Servers.fetchByServerId(this.message.guild.id);
            if (server === null) {
                Log_1.Log.warning("MessageHandler.ts", "Couldn't save server to the database");
                return;
            }
            if (server.doEmojis && user.emojiID) {
                if (this.message.author.id !== ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    this.message.react(user.emojiID);
                }
                else {
                    const avatar = yield DAO_1.DAO.Avatars.getActive();
                    if (avatar) {
                        this.message.react(avatar.emojiID);
                    }
                }
            }
            const commandHandler = new CommandHandler_1.CommandHandler(this.client, this.message, user, server);
            commandHandler.handle();
        });
    }
}
exports.MessageHandler = MessageHandler;
;
//# sourceMappingURL=MessageHandler.js.map