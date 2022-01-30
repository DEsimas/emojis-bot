import { Command as CommandHandler } from "./../commands/Command";
import { categories, commandsArray } from "./CommandsList";
import { CommandOptions } from "./../commands/Command";

export const languagesArray = ["eng", "rus"] as const;

export type CommandName = typeof commandsArray[number];

export type Language = typeof languagesArray[number];

export type Categories = typeof categories[number];

export type CommandLocalization = Record<CommandName, Record<string, string>>

export interface Command {
    alias: string[];
    out: new(options: CommandOptions) => CommandHandler;
};

export interface ICollections {
    users: string;
    servers: string;
    avatars: string;
    notifications: string;
    logs: string;
}