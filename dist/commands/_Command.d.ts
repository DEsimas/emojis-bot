import { Client, ColorResolvable, Message } from "discord.js";
import { ILocalization } from "../config/Localization.d";
import { Server } from "../database/Servers";
import { User } from "../database/Users";
export declare class Command {
    protected readonly client: Client;
    protected readonly message: Message;
    protected readonly user: User;
    protected readonly server: Server;
    protected readonly args: string[];
    protected readonly localization: ILocalization;
    protected readonly embedColors: Record<"error" | "success" | "discord", ColorResolvable>;
    constructor(client: Client, message: Message, user: User, server: Server, args: string[]);
    execute(): Promise<void>;
    protected validateURL(str: string): boolean;
    protected isAdmin(): Promise<boolean>;
    protected sendError(message: string): void;
    protected sendSuccess(message: string): void;
    private sendMessage;
}
