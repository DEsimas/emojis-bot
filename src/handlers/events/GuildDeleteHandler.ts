import { DAO } from "./../../database/DAO";

import { Guild } from "discord.js";
import { Handler } from "../Handler";

export class GuildDeleteHandler extends Handler {
    private readonly guild: Guild;

    constructor(guild: Guild) {
        super();
        this.guild = guild;
    }

    public async handle(): Promise<void> {
        DAO.Servers.deleteOneByServerId(this.guild.id);
    }
};