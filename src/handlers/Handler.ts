import { ColorResolvable } from "discord.js";

export abstract class Handler {
    protected readonly embedColors: Record<"error" | "success" | "discord", ColorResolvable> = {
        error: "#ff0000",
        success: "#00ff00",
        discord: "#202225"
    };

    protected abstract handle(): Promise<void>;
}