import { Client, ColorResolvable, Message, MessageEmbed } from "discord.js";
import { CommandName, Language } from "../config/Types";
import { commandsLocalization } from "./../config/Localization";
import { Server } from "./../database/Servers";
import { User } from "./../database/Users";

export abstract class Command {
    protected readonly client: Client;
    protected readonly message: Message;
    protected readonly user: User;
    protected readonly server: Server;
    protected readonly args: string[];
    protected readonly localization: Record<string, string>;
    protected readonly language: Language;

    protected readonly embedColors: Record<"error" | "success" | "discord", ColorResolvable> = {
        error: "#ff0000",
        success: "#00ff00",
        discord: "#202225"
    };

    constructor(client: Client, message: Message, user: User, server: Server, args: string[], command: CommandName) {
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server;
        this.args = args;
        this.language = user.language;
        this.localization = commandsLocalization[this.language][command];
    }

    public abstract execute(): Promise<void>;

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

    protected async sendError(message: string): Promise<Message> {
        return this.sendMessage(message, this.embedColors.error);
    }

    protected async sendSuccess(message: string): Promise<Message> {
        return this.sendMessage(message, this.embedColors.success);
    }

    protected async sendMessage(message: string, color: ColorResolvable | undefined): Promise<Message> {
        if(!color) color = this.embedColors.discord;
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(message);
        return this.message.channel.send({ embeds: [embed] });
    }
};