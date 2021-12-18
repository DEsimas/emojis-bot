import { Client, Guild } from "discord.js";
import { config } from "../config";
import { DAO } from "../database/DAO";

export class guildCreateHandler {
    private readonly DAO: DAO;
    private readonly guild: Guild;
    private readonly client: Client;
    private readonly config: typeof config;

    constructor(client: Client, DAO: DAO, guild: Guild) {
        this.DAO = DAO;
        this.guild = guild;
        this.client = client;
        this.config = config;
    }

    public async handle(): Promise<void> {
        this.DAO.Servers.insertOne({ serverID: this.guild.id, doEmojis: this.config.default.doEmojis, prefix: this.config.default.prefix });
        this.guild.me?.setNickname(await this.getNickname());
    }

    private async getNickname(): Promise<string> {
        const support_guild = await this.client.guilds.fetch(this.config.support_server_id);
        return support_guild.me?.nickname || this.config.default.nickname;
    }
};