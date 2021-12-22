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
exports.DoEmojis = void 0;
const DAO_1 = require("../database/DAO");
const _Command_1 = require("./_Command");
class DoEmojis extends _Command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isAdmin())) {
                this.sendError(this.localization.doEmojis.access_warn);
                return;
            }
            switch (this.args[1]) {
                case "on":
                    this.on();
                    break;
                case "off":
                    this.off();
                    break;
                default:
                    this.sendError(this.localization.doEmojis.args_warn);
                    break;
            }
        });
    }
    on() {
        DAO_1.DAO.Servers.updateOneByServerId(this.server.serverID, { doEmojis: true })
            .then(() => this.sendSuccess(this.localization.doEmojis.on))
            .catch(() => this.sendError(this.localization.doEmojis.db_error));
    }
    off() {
        DAO_1.DAO.Servers.updateOneByServerId(this.server.serverID, { doEmojis: false })
            .then(() => this.sendSuccess(this.localization.doEmojis.off))
            .catch(() => this.sendError(this.localization.doEmojis.db_error));
    }
}
exports.DoEmojis = DoEmojis;
//# sourceMappingURL=DoEmojis.js.map