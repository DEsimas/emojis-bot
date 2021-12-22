import { DAO } from "../database/DAO";
import { Command } from "./_Command";

export class DoEmojis extends Command {
    public override async execute(): Promise<void> {
        if(!await this.isAdmin()) {
            this.sendError(this.localization.doEmojis.access_warn);
            return;
        }

        switch(this.args[1]) {
            case "on":
                this.on();
                break;
            case "off":
                this.off();
                break;
            default:
                this.sendError(this.localization.doEmojis.args_warn);
                break;
        }
    }

    private on() {
        DAO.Servers.updateOneByServerId(this.server.serverID, { doEmojis: true })
            .then(() => this.sendSuccess(this.localization.doEmojis.on))
            .catch(() => this.sendError(this.localization.doEmojis.db_error));
    }

    private off() {
        DAO.Servers.updateOneByServerId(this.server.serverID, { doEmojis: false })
            .then(() => this.sendSuccess(this.localization.doEmojis.off))
            .catch(() => this.sendError(this.localization.doEmojis.db_error));
    }
}