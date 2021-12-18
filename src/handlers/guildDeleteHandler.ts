import { Client, Guild } from "discord.js";
import { DAO } from "../database/DAO";

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