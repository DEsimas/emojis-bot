import { GuildMember, MessageEmbed } from "discord.js";
import { guildMembers } from "../../config/Localization";
import { Handler } from "../Handler";

export class GuildMemberAdd extends Handler {
    private readonly member: GuildMember;

    constructor(member: GuildMember) {
        super();
        this.member = member;
    }

    public async handle(): Promise<void> {
        const embed = new MessageEmbed()
            .setColor(this.embedColors.success)
            .setThumbnail(this.member.user.avatarURL() || this.defaultAvatar)
            .setTitle(this.member.user.username + guildMembers.welcome)
            .setFooter(this.member.guild.name)
            .setTimestamp();
        
        this.member.guild.systemChannel?.send({ embeds: [embed] });
    }
}