import { ColorResolvable } from "discord.js";

export abstract class Handler {
    protected readonly defaultAvatar = "https://cdn.discordapp.com/embed/avatars/0.png";
    protected readonly embedColors: Record<"error" | "success" | "discord", ColorResolvable> = {
        error: "#ff0000",
        success: "#00ff00",
        discord: "#202225"
    };

    protected abstract handle(): Promise<void>;
}