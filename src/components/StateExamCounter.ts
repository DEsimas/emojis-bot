import { Log } from "./../components/Log";

import { schedule, ScheduledTask } from "node-cron";
import { Client, MessageEmbed } from "discord.js";

export class StateExamCounter {
    private readonly client: Client;
    private readonly users: Record<string, Array<string>>;

    private readonly dates: Record<string, Date> = {
        math: new Date("06.02.2022"),
        russian: new Date("05.30.2022"),
        physics: new Date("06.06.2022"),
        informatics: new Date("06.20.2022"),
        chemistry: new Date("05.27.2022")
    };

    // TODO: move to localization object
    private readonly subjects: Record<string, string> = {
        "math": "Математика профиль",
        "russian": "Русский язык",
        "physics": "Физика",
        "informatics": "Информатика",
        "chemistry": "Химия"
    }

    constructor(client: Client) {
        this.client = client;
        this.users = JSON.parse(process.env.EGE || "{}");
    }

    public getTask(time: string): ScheduledTask {
        return schedule(time, () => this.sendNotifications());
    }

    private async sendNotifications(): Promise<void> {
        Log.info("StateExamCounter.ts", "Regular state exam counter call", { users: this.users });
        Object.keys(this.users).forEach(async key => {
            const channel = await this.client.users.fetch(key);
            const embed = new MessageEmbed().setTitle("До егэ осталось:");
            this.users[key].forEach(lesson => {
                embed.addField(this.subjects[lesson], `${this.getDifference(new Date(), this.dates[lesson]).d} дней`, true);
            });
            channel.send({embeds: [embed]});
        });
    }

    // TODO: make specific function
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
}