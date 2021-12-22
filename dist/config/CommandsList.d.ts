import { Command } from "../commands/_Command";
export interface ICommand {
    name: "SetLanguage" | "SetEmoji" | "DeleteEmoji" | "DoEmojis" | "SetPrefix" | "ImgToAscII" | "Subscribe" | "Unsubscribe" | "Clear" | "Help";
    alias: string[];
    out: typeof Command;
}
export declare const commands: Array<ICommand>;
