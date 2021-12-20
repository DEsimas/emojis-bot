import { DAO } from "../database/DAO";

import { Guild } from "discord.js";

export class guildDeleteHandler {
    private readonly DAO: DAO;
    private readonly guild: Guild;

    constructor(DAO: DAO, guild: Guild) {
        this.DAO = DAO;
        this.guild = guild;
    }

    public async handle(): Promise<void> {
        this.DAO.Servers.deleteOneByServerId(this.guild.id);
    }
};