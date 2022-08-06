import { DAO } from "./../../database/DAO";
import { Client, Guild } from "discord.js";
import { Handler } from "../Handler";

export class GuildCreateHandler extends Handler {
    private readonly guild: Guild;
    private readonly client: Client;

    private readonly support_server = "885941024478883870";

    constructor(client: Client, guild: Guild) {
        super();
        this.guild = guild;
        this.client = client;
    }

    public async handle(): Promise<void> {
        DAO.Servers.insertNew(this.guild.id);
        this.guild.members.me?.setNickname(await this.getNickname());
    }

    private async getNickname(): Promise<string> {
        const support_guild = await this.client.guilds.fetch(this.support_server);
        return support_guild.members.me?.nickname || "emojis-bot";
    }
};