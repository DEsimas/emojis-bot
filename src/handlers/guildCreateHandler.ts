import { DAO } from "../database/DAO";
import { Client, Guild } from "discord.js";
import { EventHandler } from "./_EventHandler";

export class GuildCreateHandler extends EventHandler {
    private readonly support_server = "885941024478883870";

    public async handle(): Promise<void> {
        if(this.guild === undefined) {
            //throw;
            return;
        }
        DAO.Servers.insertNew(this.guild.id);
        this.guild.me?.setNickname(await this.getNickname());
    }

    private async getNickname(): Promise<string> {
        const support_guild = await this.client.guilds.fetch(this.support_server);
        return support_guild.me?.nickname || "emojis-bot";
    }
};