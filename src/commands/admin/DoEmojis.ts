import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

export class DoEmojis extends Command {
    public override async execute(): Promise<void> {
        if(!await this.isAdmin()) {
            this.sendError(this.localization.access_warn);
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
                this.sendError(this.localization.args_warn);
                break;
        }
    }

    private on() {
        DAO.Servers.updateOneByServerId(this.server.serverID, { doEmojis: true })
            .then(() => this.sendSuccess(this.localization.on))
            .catch(() => this.sendError(this.localization.db_error));
    }

    private off() {
        DAO.Servers.updateOneByServerId(this.server.serverID, { doEmojis: false })
            .then(() => this.sendSuccess(this.localization.off))
            .catch(() => this.sendError(this.localization.db_error));
    }
}