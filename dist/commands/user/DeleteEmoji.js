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
exports.DeleteEmoji = void 0;
const DAO_1 = require("./../../database/DAO");
const _Command_1 = require("./../_Command");
class DeleteEmoji extends _Command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            DAO_1.DAO.Users.updateByUserId(this.message.author.id, { emojiID: null })
                .then(() => this.sendSuccess(this.localization.deleteEmoji.success))
                .catch(() => this.sendError(this.localization.deleteEmoji.db_error));
        });
    }
}
exports.DeleteEmoji = DeleteEmoji;
//# sourceMappingURL=DeleteEmoji.js.map