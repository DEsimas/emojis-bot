import { Command } from "./_Command";

export class Clear extends Command {
    public override async execute(): Promise<void> {
        this.sendError("Method not implemented.");
    }
}