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
exports.UserInterfaceUpdater = void 0;
const DAO_1 = require("../database/DAO");
const Log_1 = require("../Log");
const node_cron_1 = require("node-cron");
class UserInterfaceUpdater {
    constructor(client) {
        this.status = "on ${servers} servers with ${users} users";
        this.client = client;
    }
    getTask(time) {
        return (0, node_cron_1.schedule)(time, () => this.updateUI());
    }
    updateUI() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.setActivity();
            const avatars = yield DAO_1.DAO.Avatars.getNotActive();
            const avatar = avatars[Math.round(Math.random() * (avatars.length - 1))];
            (_a = this.client.user) === null || _a === void 0 ? void 0 : _a.setAvatar(avatar.imageURL).then(() => __awaiter(this, void 0, void 0, function* () {
                Log_1.Log.info("UserInterfaceUpdater.ts", "Avatar updated", { avatar: avatar });
                this.setNickname(avatar.name);
                yield DAO_1.DAO.Avatars.switchActive(avatar.name);
                Log_1.Log.info("UserInterfaceUpdater.ts", "Active avatar changed");
            })).catch(error => {
                Log_1.Log.warning("UserInterfaceUpdater.ts", "Failed to update ui", { error: error });
            });
        });
    }
    setActivity() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const servers = yield DAO_1.DAO.Servers.count();
            const users = yield DAO_1.DAO.Users.count();
            let activity = this.status;
            activity = activity.replace("${servers}", servers.toString());
            activity = activity.replace("${users}", users.toString());
            if ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.setActivity(activity))
                Log_1.Log.info("UserInterfaceUpdater.ts", "Activity updated", { activity: activity });
        });
    }
    setNickname(nickname) {
        this.client.guilds.cache.forEach(el => {
            var _a;
            (_a = el.me) === null || _a === void 0 ? void 0 : _a.setNickname(nickname);
        });
        Log_1.Log.info("UserInterfaceUpdater.ts", "Nickname updated", { nickname: nickname });
    }
}
exports.UserInterfaceUpdater = UserInterfaceUpdater;
;
//# sourceMappingURL=UserInterfaceUpdater.js.map