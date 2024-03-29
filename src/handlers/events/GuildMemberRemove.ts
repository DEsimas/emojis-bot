import { GuildMember, EmbedBuilder } from "discord.js";
import { guildMembers } from "../../config/Localization";
import { DAO } from "../../database/DAO";
import { Handler } from "../Handler";

export class GuildMemberRemove extends Handler {
    private readonly member: GuildMember;

    constructor(member: GuildMember) {
        super();
        this.member = member;
    }

    public async handle(): Promise<void> {
        if(!(await DAO.Servers.fetchByServerId(this.member.guild.id)).doGreetings) return;

        const embed = new EmbedBuilder()
            .setColor(this.embedColors.error)
            .setThumbnail(this.member.user.avatarURL() || this.defaultAvatar)
            .setTitle(guildMembers.bye + this.member.user.username)
            .setFooter({text: this.member.guild.name})
            .setTimestamp();
        
        this.member.guild.systemChannel?.send({ embeds: [embed] });
    }
}