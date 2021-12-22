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
exports.SetLanguage = void 0;
const Localization_1 = require("./../../config/Localization");
const DAO_1 = require("./../../database/DAO");
const _Command_1 = require("./../_Command");
class SetLanguage extends _Command_1.Command {
    execute() {
        const _super = Object.create(null, {
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const language = this.getLanguage();
            const userID = this.message.author.id;
            if (!language)
                return;
            DAO_1.DAO.Users.updateByUserId(userID, { language: language })
                .then(() => this.sendSuccess(this.localization.setLanguage.success + language))
                .catch(() => _super.sendError.call(this, this.localization.setLanguage.db_error));
        });
    }
    getLanguage() {
        const language = this.args[1];
        if (language === undefined) {
            this.sendError(this.localization.setLanguage.empty);
            return undefined;
        }
        ;
        let flag = false;
        Object.keys(Localization_1.Localization).map(objectKey => {
            if (objectKey === language)
                flag = true;
        });
        if (!flag) {
            this.sendError(this.localization.setLanguage.warn);
            return undefined;
        }
        ;
        return language;
    }
    ;
}
exports.SetLanguage = SetLanguage;
//# sourceMappingURL=SetLanguage.js.map