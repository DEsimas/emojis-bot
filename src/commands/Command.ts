import { commandsLocalization } from "./../config/Localization";
import { CommandName, Language } from "../config/Types";
import { Server } from "./../database/Servers";
import { User } from "./../database/Users";

import { Client, ColorResolvable, Message, EmbedBuilder } from "discord.js";

export interface CommandOptions {
    client: Client;
    message: Message;
    user: User;
    server: Server;
    args: string[];
    command: CommandName;
};

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

    constructor(options: CommandOptions) {
        this.client = options.client;
        this.message = options.message;
        this.user = options.user;
        this.server = options.server;
        this.args = options.args;
        this.language = options.user.language;
        this.localization = commandsLocalization[this.language][options.command];
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
        if(this.server.serverID[0] == "D" && this.server.serverID[1] == "M") return true; //if message from DMs
        const guildMember = await this.message.guild?.members.fetch(this.message.author.id)
        if(!guildMember) return false;
        const isAdmin = guildMember.permissions.has("Administrator");
        return isAdmin;
    };

    protected sendError(message: string): void {
        this.sendMessage(message, this.embedColors.error);
    }

    protected sendSuccess(message: string): void {
        this.sendMessage(message, this.embedColors.success);
    }

    private sendMessage(message: string, color: ColorResolvable): void {
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(message);
        this.message.channel.send({ embeds: [embed] });
    }
};