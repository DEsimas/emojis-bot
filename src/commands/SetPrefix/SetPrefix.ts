import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

export class SetPrefix extends Command {
    public override async execute(): Promise<void> {
        if(!await this.isAdmin()) {
            this.sendError(this.localization.access_warn);
            return;
        }
        if (this.args[1] === undefined) {
            this.sendError(this.localization.empty_warn);
            return;
        }

        DAO.Servers.updateOneByServerId(this.server.serverID, { prefix: this.args[1] })
            .then(() => this.sendSuccess(this.localization.success + this.args[1]))
            .catch(() => super.sendError(this.localization.db_error));
    }
}