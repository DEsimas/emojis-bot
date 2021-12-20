import { DAO } from "../database/DAO";
import { config } from "../config";

import { Client, Guild } from "discord.js";

export class GuildCreateHandler {
    private readonly guild: Guild;
    private readonly client: Client;

    constructor(client: Client, guild: Guild) {
        this.guild = guild;
        this.client = client;
    }

    public async handle(): Promise<void> {
        DAO.Servers.insertOne({ serverID: this.guild.id, doEmojis: config.database.defaults.doEmojis, prefix: config.database.defaults.prefix });
        this.guild.me?.setNickname(await this.getNickname());
    }

    private async getNickname(): Promise<string> {
        const support_guild = await this.client.guilds.fetch(config.ids.support_server);
        return support_guild.me?.nickname || config.database.defaults.nickname;
    }
};