import { DAO } from "../database/DAO";

import { Guild } from "discord.js";

export class GuildDeleteHandler {
    private readonly guild: Guild;

    constructor(guild: Guild) {
        this.guild = guild;
    }

    public async handle(): Promise<void> {
        DAO.Servers.deleteOneByServerId(this.guild.id);
    }
};