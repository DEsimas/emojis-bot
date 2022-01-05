import { MessageEmbed, ReactionCollector } from "discord.js";
import { Command } from "./../Command";

export class Poll extends Command{
    private readonly check = "✅";
    private readonly cross = "❌";

    public override async execute(): Promise<void> {
        const time = this.getTime();
        if(time && time > 21600000) {
            this.sendError(this.localization.bad_time_error);
            return;
        }

        const msg = await this.message.channel.send({embeds: [new MessageEmbed().setColor(this.embedColors.success).setTitle(this.getMessage() || this.localization.default_message)]});
        msg.react(this.check);
        msg.react(this.cross);

        if(time) {
            const collector = new ReactionCollector(msg, { time: time });

            collector.on("end", collected => {
                let yctr = 0, nctr = 0;
                collected.forEach((val, key) => {
                    switch(key) {
                        case this.check:
                            yctr = val.count - 1;
                            break;
                        case this.cross:
                            nctr = val.count - 1;
                            break;
                    }
                });

                const embed = new MessageEmbed()
                    .setColor(this.embedColors.success)
                    .setTitle(`${this.check}: ${yctr}\n${this.cross}: ${nctr}`);
                msg.reply({embeds: [embed]});
            });
        }
    }

    private getTime(): number | null {
        let time: number = 0;
        this.args.forEach(arg => {
            const h = Number(arg.split("h")[0]);
            const m = Number(arg.split("m")[0]);
            const s = Number(arg.split("s")[0]);
            if(h) {
                time += h*60*60*1000;
            }

            if(m) {
                time += m*60*1000;
            }

            if(s) {
                time += s*1000;
            }
        });

        if(time === 0) return null;
        return time;
    }

    private getMessage(): string | null {
        let msg = "";
        for(let i = 1; i < this.args.length; i++) {
            if(!Number(this.args[i].split("h")[0]) && !Number(this.args[i].split("m")[0]) && !Number(this.args[i].split("s")[0])) {
                msg += this.args[i];
                msg += " ";
            }
            else break;
        }

        return msg.length ? msg : null;
    }
}