import { Command } from "./../Command";
import { Log } from "./../../components/Log";

export class Clear extends Command {
    public async execute(): Promise<void> {
        let limit = this.getLimit();

        this.message.channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(element => {
                if((element.author.id === this.client.user?.id) && (limit > 0)) {
                    element.delete();
                    limit--;
                }
            });
        }).catch(error => {
            this.sendError(this.localization.error);
            Log.error("Clear.ts", "Epic clear fail", { error: error, limit: limit });
        });
    }

    private getLimit(): number {
        if ((isNaN(Number(this.args[1]))) || Number(this.args[1]) <= 0 || Number(this.args[1]) >= 100) return 100;
        return Number(this.args[1]);
    }
}