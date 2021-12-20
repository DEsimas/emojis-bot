import { DAO } from "../database/DAO";
import { Command } from "./_Command";

export class Help extends Command {
    public override async execute(): Promise<void> {
        this.sendError("Method not implemented.");
    }
}