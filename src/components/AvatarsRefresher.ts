import { Avatar } from "../database/Avatars";
import { DAO } from "../database/DAO";
import { config } from "../config";
import { Log } from "../Log";

import { schedule, ScheduledTask } from "node-cron";
import { Client, Message } from "discord.js";

export class AvatarsRefresher {
    private readonly client: Client;
    private readonly DAO: DAO;

    constructor(client: Client, DAO: DAO) {
        this.client = client;
        this.DAO = DAO;
    }

    public getTask(time: string): ScheduledTask {
        return schedule(time, () => this.refreshAvatars());
    }

    private async refreshAvatars(): Promise<void> {
        const messages = await this.fetchMessages();
        const avatars = await this.parseAvatars(messages);

        const count = await this.DAO.Avatars.count();
        await this.DAO.Avatars.deleteAll();
        await this.DAO.Avatars.insertMany(avatars);

        Log.info(`AvatarsRefresher.ts:\tavatars in db refreshed (${count} -> ${avatars.length})`);
    }

    private async fetchMessages(): Promise<Message[]> {
        const server = await this.client.guilds.fetch(config.ids.support_server);
        const channel = await server.channels.fetch(config.ids.avatars_channel);
        if(channel?.type !== "GUILD_TEXT") return [];
        const messages: Message[] = [];
        (await channel.messages.fetch()).forEach(msg => {
            messages.push(msg);
        });
        return messages;
    }
    
    private async parseAvatars(messages: Message[]): Promise<Avatar[]> {
        const avatars: Avatar[] = [];
        const activeName = (await this.DAO.Avatars.getActive())?.name ;
        
        messages.forEach( msg => {
            const avatar = this.convMessageToAvatar(msg, activeName);
            avatars.push(avatar);
        });
        
        return avatars;
    }

    private convMessageToAvatar(msg: Message, active: string | undefined): Avatar {
        const imageURL = msg.attachments.first()?.url || config.database.defaults.avatar;
        const emojiID = msg.reactions.cache.first()?.emoji.identifier;
        const color = config.embed_colors.discord.toString();
        
        return {
            name: msg.content,
            imageURL: imageURL,
            emojiID: emojiID || "",
            color: color,
            active: active === msg.content
        };
    }
};