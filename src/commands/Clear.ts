<<<<<<< HEAD:src/commands/interaction/Clear.ts
import { Log } from "./../../Log.js";
import { Command } from "./../_Command.js";
=======
import { Log } from "../Log";
import { Command } from "./_Command";
>>>>>>> parent of c5b0847 (commands grouping):src/commands/Clear.ts

export class Clear extends Command {
    public override async execute(): Promise<void> {
        let limit = this.getLimit();

        this.message.channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(element => {
                if((element.author.id === this.client.user?.id) && (limit > 0)) {
                    element.delete();
                    limit--;
                }
            });
        }).catch(error => {
            this.sendError(this.localization.clear.error);
            Log.error("Clear.ts", "Epic clear fail", { error: error, limit: limit });
        });
    }

    private getLimit(): number {
        if ((isNaN(Number(this.args[1]))) || Number(this.args[1]) <= 0) return 100;
        return Number(this.args[1]);
    }
}