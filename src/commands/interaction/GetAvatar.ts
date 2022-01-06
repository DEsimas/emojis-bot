import { Command } from "../Command";

export class GetAvatar extends Command {
    public override async execute(): Promise<void> {
        console.log("uwu");
    }
}