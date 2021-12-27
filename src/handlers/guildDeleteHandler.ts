import { DAO } from "./../database/DAO";

import { Guild } from "discord.js";
import { EventHandler } from "./_EventHandler";

export class GuildDeleteHandler extends EventHandler {
    public async handle(): Promise<void> {
        if(this.guild === undefined) {
            //throw
            return;
        }
        DAO.Servers.deleteOneByServerId(this.guild.id);
    }
};