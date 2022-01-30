import { DAO } from "./../../database/DAO";
import { Command } from "./../Command";

export class DoGreetings extends Command {
    public async execute(): Promise<void> {
        if(!(await this.isAdmin())) {
            this.sendError(this.localization.access_error);
            return;
        }

        switch(this.args[1]?.toLowerCase()){ 
            case "on":
                DAO.Servers.updateOneByServerId(this.server.serverID, { doGreetings: true });
                this.sendSuccess(this.localization.on);
                break;
            case "off":
                DAO.Servers.updateOneByServerId(this.server.serverID, { doGreetings: false });
                this.sendSuccess(this.localization.off);
                break;
            default:
                this.sendError(this.localization.wrong_input);
                break;
        }
    }
}