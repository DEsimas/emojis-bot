import { CommandHandler } from "./../other/CommandHandler";
import { Log } from "./../../components/Log";
import { DAO } from "./../../database/DAO";
import { Handler } from "./../Handler";

import { Client, ColorResolvable, Message, MessageEmbed } from "discord.js";
import { Language } from "../../config/Types";
import { prefixHint } from "../../config/Localization";

export class MessageHandler extends Handler {
    private readonly client: Client;
    private readonly message: Message;

    constructor(client: Client, message: Message) {
        super();
        this.client = client;
        this.message = message;
    }

    public async handle(): Promise<void> {
        const user = await DAO.Users.fetchByUserId(this.message.author.id);
        let server;
        if(this.message.guild)
            server = await DAO.Servers.fetchByServerId(this.message.guild.id);
        else
            server = await DAO.Servers.fetchByServerId("DM"+this.message.channelId);

        if (server.doEmojis) {
            if (this.message.author.id !== this.client.user?.id && user.emojiID) {
                try {
                    await this.message.react(user.emojiID);
                } catch {
                    Log.warning("MessageHandler.ts", "Failed to react users message", { user: user, server: server });
                }
            } else if (this.message.author.id === this.client.user?.id) {
                const avatar = await DAO.Avatars.getActive();
                if (avatar) {
                    try {
                        await this.message.react(avatar.emojiID);
                    } catch {
                        Log.warning("MessageHandler.ts", "Failed to react bot message", { avatar: avatar, server: server });
                    }
                }
            }
        }

        this.sendPrefixHelp((await DAO.Avatars.getActive())?.color, server.prefix, user.language);

        const commandHandler = new CommandHandler(this.client, this.message, user, server);
        commandHandler.handle();
    }

    private sendPrefixHelp(msgColor: ColorResolvable | undefined, correctPrefix: string, lang: Language): void {
        const msg = this.message.content.toLocaleLowerCase()
        if(msg.search("prefix") != -1) {
            const prefix = msg.split("prefix")[0];
            if(prefix != correctPrefix && prefix.length == 1) {
                const embed = new MessageEmbed();
                embed.setTitle( prefixHint[lang] + correctPrefix);
                embed.setColor(msgColor ?? "#202225");
                this.message.channel.send({embeds: [embed]});
            }
        }
    }
};