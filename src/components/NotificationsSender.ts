import { Client, MessageEmbed } from "discord.js";
import { DAO } from "./../database/DAO";
import { Log } from "./../Log";

import { schedule, ScheduledTask } from 'node-cron';
import { notifications } from "../config/Localization";

export class NotificationsSender {
    private readonly client: Client;
        private readonly embed_color = "#202225";

    constructor(client: Client)  {
        this.client = client;
    }

    public getTask(time: string): ScheduledTask {
        return schedule(time, () => this.sendNotifications());
    }

    private async sendNotifications(): Promise<void> {
        const Notifications = await DAO.Notifications.getAll();
        
        Notifications.forEach(async user => {
            const diff = this.getDifference(user.birth, new Date());

            const localization = notifications[(await DAO.Users.fetchByUserId(user.userID)).language];
            
            const channel = await this.client.users.fetch(user.userID);
            const embed = new MessageEmbed()
                .setColor(this.embed_color)
                .addField(localization.header, `${diff.years} ${localization.y} ${diff.months} ${localization.m} ${diff.days} ${localization.d}`)
                .addField(`${localization.d}:`, diff.d.toString(), true)
                .addField(`${localization.h}:`, diff.h.toString(), true)
                .addField(`${localization.min}:`, diff.m.toString(), true);

            channel.send({ embeds: [embed] });
        });

        Log.info("NotificationsSender.ts", "Notifications sended", { users: Notifications });
    }

    private getDifference(begin: Date, end: Date): {s: number, m: number, h: number, d: number, years: number, months: number, days: number} {
        const future = new Date(begin);

        let res = {
            s: 0,
            m: 0,
            h: 0,
            d: 0,
            years: 0,
            months: 0,
            days: 0
        }

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

        const diff = Math.abs(begin.getTime() - end.getTime())
        res.d = Math.floor( diff / (1000 * 60 * 60 * 24));
        res.h = Math.floor( diff / (1000 * 60 * 60));
        res.m = Math.floor( diff / (1000 * 60));
        res.s = Math.floor( diff / 1000 );

        return res;
    }
};