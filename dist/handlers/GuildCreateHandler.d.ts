import { Client, Guild } from "discord.js";
export declare class GuildCreateHandler {
    private readonly guild;
    private readonly client;
    private readonly support_server;
    constructor(client: Client, guild: Guild);
    handle(): Promise<void>;
    private getNickname;
}
