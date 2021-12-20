import { Command } from "./_Command";

export class Unsubscribe extends Command {
    public override async execute(): Promise<void> {
        this.sendError("Method not implemented.");
    }
}