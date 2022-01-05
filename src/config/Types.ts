import { Command as CommandsParrent } from "../commands/Command";
import { commandsArray } from "./CommandsList";

export const languagesArray = ["eng", "rus"] as const;

export type CommandName = typeof commandsArray[number];
export type Language = typeof languagesArray[number];
export type CommandLocalization = Record<CommandName, Record<string, string>>

export interface Command {
    alias: string[];
    out: typeof CommandsParrent;
};

export interface ICollections {
    users: string;
    servers: string;
    avatars: string;
    notifications: string;
    logs: string;
}