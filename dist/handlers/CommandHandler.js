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
exports.CommandHandler = void 0;
const CommandsList_1 = require("../config/CommandsList");
class CommandHandler {
    constructor(client, message, user, server) {
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server;
    }
    handle() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.message.author.id !== ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                const content = this.message.content.trim();
                const args = content.split(" ");
                const command = args[0].toLowerCase();
                if (command.search(this.server.prefix) === -1)
                    return;
                CommandsList_1.commands.forEach(cmd => {
                    cmd.alias.forEach(alias => {
                        if (this.server.prefix + alias === command)
                            new cmd.out(this.client, this.message, this.user, this.server, args).execute();
                    });
                });
            }
            ;
        });
    }
}
exports.CommandHandler = CommandHandler;
;
//# sourceMappingURL=CommandHandler.js.map