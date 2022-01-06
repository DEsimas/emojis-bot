import { GuildMember } from "discord.js";
import { Handler } from "../Handler";

export class GuildMemberAdd extends Handler {
    private readonly member: GuildMember;

    constructor(member: GuildMember) {
        super();
        this.member = member;
    }

    public async handle(): Promise<void> {
        console.log("uwu");
    }
}