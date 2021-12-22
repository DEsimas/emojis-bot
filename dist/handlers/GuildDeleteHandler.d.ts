import { Guild } from "discord.js";
export declare class GuildDeleteHandler {
    private readonly guild;
    constructor(guild: Guild);
    handle(): Promise<void>;
}
