<<<<<<< HEAD:src/commands/admin/DoEmojis.ts
import { DAO } from "./../../database/DAO.js";
import { Command } from "./../_Command.js";
=======
import { DAO } from "../database/DAO";
import { Command } from "./_Command";
>>>>>>> parent of c5b0847 (commands grouping):src/commands/DoEmojis.ts

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