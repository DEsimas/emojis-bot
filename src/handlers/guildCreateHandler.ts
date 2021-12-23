import { DAO } from "./../database/DAO";
import { Client, Guild } from "discord.js";

export class GuildCreateHandler {
    private readonly guild: Guild;
    private readonly client: Client;

    private readonly support_server = "885941024478883870";

    constructor(client: Client, guild: Guild) {
        this.guild = guild;
        this.client = client;
    }

    public async handle(): Promise<void> {
        DAO.Servers.insertNew(this.guild.id);
        this.guild.me?.setNickname(await this.getNickname());
    }

    private async getNickname(): Promise<string> {
        const support_guild = await this.client.guilds.fetch(this.support_server);
        return support_guild.me?.nickname || "emojis-bot";
    }
};