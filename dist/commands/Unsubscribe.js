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
exports.Unsubscribe = void 0;
const DAO_1 = require("../database/DAO");
const _Command_1 = require("./_Command");
class Unsubscribe extends _Command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.message.author.id;
            if ((yield DAO_1.DAO.Notifications.findByUserId(id)) === null) {
                this.sendError(this.localization.unsubscribe.not_subbed);
                return;
            }
            DAO_1.DAO.Notifications.deleteByUserId(id);
            this.sendSuccess(this.localization.unsubscribe.success);
        });
    }
}
exports.Unsubscribe = Unsubscribe;
//# sourceMappingURL=Unsubscribe.js.map