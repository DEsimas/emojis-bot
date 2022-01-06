import { GuildMember, MessageEmbed } from "discord.js";

export class GuildMemberAdd {
    private readonly member: GuildMember;

    constructor(member: GuildMember) {
        this.member = member;
    }

    public async handle(): Promise<void> {
        console.log("uwu");
    }
}