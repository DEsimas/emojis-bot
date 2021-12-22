import { Command } from "./_Command";
export declare class SetEmoji extends Command {
    private readonly emojiLink;
    execute(): Promise<void>;
    private checkEmoji;
}
