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
exports.Subscribe = void 0;
const DAO_1 = require("./../../database/DAO");
const Log_1 = require("./../../Log");
const _Command_1 = require("./../_Command");
class Subscribe extends _Command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.validate()))
                return;
            const notification = {
                userID: this.message.author.id,
                birth: new Date(this.args[1])
            };
            DAO_1.DAO.Notifications.insertOne(notification).then(() => {
                this.sendSuccess(this.localization.subscribe.send_success);
            }).catch(error => {
                this.sendError(this.localization.subscribe.send_error);
                Log_1.Log.error("Subscribe.ts", "Can't save notification", { error: error, notification: notification });
            });
        });
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield DAO_1.DAO.Notifications.findByUserId(this.user.userID);
            const date = new Date(this.args[1]);
            if (notification) {
                this.sendError(this.localization.subscribe.existing_user);
                return false;
            }
            if (!(date instanceof Date && !isNaN(date.valueOf()))) {
                this.sendError(this.localization.subscribe.date_error);
                return false;
            }
            if (date >= new Date()) {
                this.sendError(this.localization.subscribe.date_error);
                return false;
            }
            return true;
        });
    }
}
exports.Subscribe = Subscribe;
//# sourceMappingURL=Subscribe.js.map