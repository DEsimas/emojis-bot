import { stateExamCounter } from "./../config/Localization"
import { Log } from "./../components/Log";
import { DAO } from "./../database/DAO";

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
            const language = (await DAO.Users.fetchByUserId(key)).language;
            const channel = await this.client.users.fetch(key);
            const embed = new MessageEmbed().setTitle(stateExamCounter[language].header);
            this.users[key].forEach(lesson => {
                const diff = this.getDifferenceInDays(new Date(), this.dates[lesson]);
                if(diff) embed.addField(stateExamCounter[language][lesson], `${diff} ${stateExamCounter[language].unit}`, true);
            });
            const msg = await channel.send({embeds: [embed]});
            Log.info("StateExamCounter.ts", "Sent exam message to the user", { userID: key, message: msg });
        });
    }

    private getDifferenceInDays(begin: Date, end: Date): number | null {
        if(begin >= end) return null;
        const diff = end.getTime() - begin.getTime();
        return Math.floor( diff / (1000 * 60 * 60 * 24)); 
    }
}