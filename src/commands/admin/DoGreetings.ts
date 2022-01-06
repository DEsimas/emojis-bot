import { DAO } from "../../database/DAO";
import { Command } from "../Command";

export class DoGreetings extends Command {
    public override async execute(): Promise<void> {
        if(!this.message.guild?.id || !(await this.isAdmin())) return this.sendError(this.localization.access_error);

        switch(this.args[1]?.toLowerCase()){ 
            case "on":
                DAO.Servers.updateOneByServerId(this.message.guild.id, { doGreetings: true });
                this.sendSuccess(this.localization.on);
                break;
            case "off":
                DAO.Servers.updateOneByServerId(this.message.guild.id, { doGreetings: false });
                this.sendSuccess(this.localization.off);
                break;
            default:
                this.sendError(this.localization.wrong_input);
                break;
        }
    }
}