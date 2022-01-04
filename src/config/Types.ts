import { Command } from "../commands/_Command";

export const commandsArray = ["SetLanguage", "SetEmoji", "DeleteEmoji", "DoEmojis", "SetPrefix", "ImgToAscII", "Subscribe", "Unsubscribe", "Clear", "Help", "Poll"];
export const languagesArray = ["eng", "rus"];

export type CommandName = typeof commandsArray[number];
export type Language = typeof languagesArray[number];

export interface ICommand {
    name: CommandName;
    alias: string[];
    out: typeof Command;
};

export interface ICollections {
    users: string;
    servers: string;
    avatars: string;
    notifications: string;
    logs: string;
}