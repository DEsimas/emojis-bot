import { Client, ColorResolvable, Message, MessageEmbed } from "discord.js";
import { Localization } from "../config/Localization";
import { ILocalization } from "../config/Localization.d";
import { Server } from "../database/Servers";
import { User } from "../database/Users";

export class Command {
    protected readonly client: Client;
    protected readonly message: Message;
    protected readonly user: User;
    protected readonly server: Server;
    protected readonly args: string[];
    protected readonly localization: ILocalization;
    protected readonly embedColors: Record<"error" | "success" | "discord", ColorResolvable> = {
        error: "#ff0000",
        success: "#00ff00",
        discord: "#202225"
    };

    constructor(client: Client, message: Message, user: User, server: Server, args: string[]) {
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server;
        this.args = args;
        this.localization = Localization[user.language];
    }

    public async execute(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    protected validateURL(str: string): boolean {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    protected async isAdmin() {
        const guildMember = await this.message.guild?.members.fetch(this.message.author.id)
        if(!guildMember) return false;
        const isAdmin = guildMember.permissions.has("ADMINISTRATOR");
        return isAdmin;
    };

    protected sendError(message: string): void {
        this.sendMessage(message, this.embedColors.error);
    }

    protected sendSuccess(message: string): void {
        this.sendMessage(message, this.embedColors.success);
    }

    private sendMessage(message: string, color: ColorResolvable): void {
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(message);
        this.message.channel.send({ embeds: [embed] });
    }
};