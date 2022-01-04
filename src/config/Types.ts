import { Command as CommandsParrent } from "../commands/_Command";

export const commandsArray = ["SetLanguage", "SetEmoji", "DeleteEmoji", "DoEmojis", "SetPrefix", "ImgToAscII", "Subscribe", "Unsubscribe", "Clear", "Help", "Poll"] as const;
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