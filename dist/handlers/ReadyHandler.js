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
exports.ReadyHandler = void 0;
const UserInterfaceUpdater_1 = require("../components/UserInterfaceUpdater");
const NotificationsSender_1 = require("../components/NotificationsSender");
const Log_1 = require("../Log");
class ReadyHandler {
    constructor(client) {
        this.cron = {
            notifications: "0 0 * * *",
            UI: "*/5 * * * *"
        };
        Log_1.Log.info("ReadyHandler.ts", "bot is ready");
        this.client = client;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = new NotificationsSender_1.NotificationsSender(this.client);
            sender.getTask(this.cron.notifications).start();
            const updater = new UserInterfaceUpdater_1.UserInterfaceUpdater(this.client);
            updater.getTask(this.cron.UI).start();
        });
    }
}
exports.ReadyHandler = ReadyHandler;
;
//# sourceMappingURL=ReadyHandler.js.map