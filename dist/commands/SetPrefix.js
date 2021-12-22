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
exports.SetPrefix = void 0;
const DAO_1 = require("../database/DAO");
const _Command_1 = require("./_Command");
class SetPrefix extends _Command_1.Command {
    execute() {
        const _super = Object.create(null, {
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isAdmin())) {
                this.sendError(this.localization.setPrefix.access_warn);
                return;
            }
            if (this.args[1] === undefined) {
                this.sendError(this.localization.setPrefix.empty_warn);
                return;
            }
            DAO_1.DAO.Servers.updateOneByServerId(this.server.serverID, { prefix: this.args[1] })
                .then(() => this.sendSuccess(this.localization.setPrefix.success + this.args[1]))
                .catch(() => _super.sendError.call(this, this.localization.setPrefix.db_error));
        });
    }
}
exports.SetPrefix = SetPrefix;
//# sourceMappingURL=SetPrefix.js.map