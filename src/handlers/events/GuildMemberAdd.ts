import { GuildMember, EmbedBuilder } from "discord.js";
import { guildMembers } from "../../config/Localization";
import { DAO } from "../../database/DAO";
import { Handler } from "../Handler";

export class GuildMemberAdd extends Handler {
    private readonly member: GuildMember;

    constructor(member: GuildMember) {
        super();
        this.member = member;
    }

    public async handle(): Promise<void> {
        if(!(await DAO.Servers.fetchByServerId(this.member.guild.id)).doGreetings) return;

        const embed = new EmbedBuilder()
            .setColor(this.embedColors.success)
            .setThumbnail(this.member.user.avatarURL() || this.defaultAvatar)
            .setTitle(this.member.user.username + guildMembers.welcome)
            .setFooter({text: this.member.guild.name})
            .setTimestamp();
        
        this.member.guild.systemChannel?.send({ embeds: [embed] });
    }
}