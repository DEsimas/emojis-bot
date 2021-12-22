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
exports.NotificationsSender = void 0;
const discord_js_1 = require("discord.js");
const DAO_1 = require("../database/DAO");
const Log_1 = require("../Log");
const node_cron_1 = require("node-cron");
const Localization_1 = require("../config/Localization");
class NotificationsSender {
    constructor(client) {
        this.embed_color = "#202225";
        this.client = client;
    }
    getTask(time) {
        return (0, node_cron_1.schedule)(time, () => this.sendNotifications());
    }
    sendNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const Notifications = yield DAO_1.DAO.Notifications.getAll();
            Notifications.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                const diff = this.getDifference(user.birth, new Date());
                const localization = Localization_1.Localization[(yield DAO_1.DAO.Users.fetchByUserId(user.userID)).language].notifications;
                const channel = yield this.client.users.fetch(user.userID);
                const embed = new discord_js_1.MessageEmbed()
                    .setColor(this.embed_color)
                    .addField(localization.header, `${diff.years} ${localization.y} ${diff.months} ${localization.m} ${diff.days} ${localization.d}`)
                    .addField(`${localization.d}:`, diff.d.toString(), true)
                    .addField(`${localization.h}:`, diff.h.toString(), true)
                    .addField(`${localization.min}:`, diff.m.toString(), true);
                channel.send({ embeds: [embed] });
            }));
            Log_1.Log.info("NotificationsSender.ts", "Notifications sended", { users: Notifications });
        });
    }
    getDifference(begin, end) {
        const future = new Date(begin);
        let res = {
            s: 0,
            m: 0,
            h: 0,
            d: 0,
            years: 0,
            months: 0,
            days: 0
        };
        while ((future.getFullYear() !== end.getFullYear()) || (future.getMonth() !== end.getMonth()) || (future.getDate() !== end.getDate())) {
            future.setDate(future.getDate() + 1);
            res.days++;
            res.d++;
            if (future.getDate() === begin.getDate()) {
                res.months++;
                res.days = 0;
            }
            if (future.getMonth() === begin.getMonth() && res.days === 0) {
                res.years++;
                res.months = 0;
            }
        }
        const diff = Math.abs(begin.getTime() - end.getTime());
        res.d = Math.floor(diff / (1000 * 60 * 60 * 24));
        res.h = Math.floor(diff / (1000 * 60 * 60));
        res.m = Math.floor(diff / (1000 * 60));
        res.s = Math.floor(diff / 1000);
        return res;
    }
}
exports.NotificationsSender = NotificationsSender;
;
//# sourceMappingURL=NotificationsSender.js.map