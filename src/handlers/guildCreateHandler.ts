import { Config, config } from "../config";
import { DAO } from "../database/DAO";

import { Client, Guild } from "discord.js";

export class GuildCreateHandler {
    private readonly DAO: DAO;
    private readonly guild: Guild;
    private readonly client: Client;
    private readonly config: Config;

    constructor(client: Client, DAO: DAO, guild: Guild) {
        this.DAO = DAO;
        this.guild = guild;
        this.client = client;
        this.config = config;
    }

    public async handle(): Promise<void> {
        this.DAO.Servers.insertOne({ serverID: this.guild.id, doEmojis: this.config.database.defaults.doEmojis, prefix: this.config.database.defaults.prefix });
        this.guild.me?.setNickname(await this.getNickname());
    }

    private async getNickname(): Promise<string> {
        const support_guild = await this.client.guilds.fetch(this.config.ids.support_server);
        return support_guild.me?.nickname || this.config.database.defaults.nickname;
    }
};