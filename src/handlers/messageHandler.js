//modules for executing commands
import deleteEmoji from "../components/user-interaction/deleteEmoji.js";
import setLanguage from "../components/user-interaction/setLanguage.js";
import setPrefix from "../components/server-interaction/setPrefix.js";
import doEmojis from "../components/server-interaction/doEmojis.js";
import setEmoji from "../components/user-interaction/setEmoji.js";
import imgToAscII from "../components/imgToAscII/imgToAscII.js";
import unsubscribe from "../components/counter/unsubscribe.js";
import subscribe from "../components/counter/subscribe.js";
import addTrack from "../components/special/addTrack.js";
import clear from "../components/interaction/clear.js";
import help from "../components/interaction/help.js";

import DAO from "./../database/DAO.js";
import Handler from "./_handler.js";
import config from "./../config.js";

export default class messageHandler extends Handler {
    constructor(data) {
        super(data);
        this.setCommandList(imgToAscII, setEmoji, deleteEmoji, setLanguage, setPrefix, doEmojis, subscribe, unsubscribe, addTrack, clear, help);
        this.setInfo().then(() => {
            this.handleEmoji();
            this.handleCommand();
        });
    };

    //list with all bots commands
    setCommandList(...components) {
        this.commands = [];
        const commands = config.commands;
        Object.keys(commands).map((key, index) => {
            this.commands.push({
                name: commands[key],
                out: components[index]
            });
        });
    };

    //find server and user in db and save into context if not found create with default params
    async setInfo() {
        await this.getUser();
        await this.getServer();
        await this.getAvatar();
    };

    //get user from db, if null create new one
    async getUser() {
        const userID = this.message.author.id;
        this.user = await DAO.Users.getOne(userID);
        if (this.user === null) {
            this.user = await DAO.Users.addOne(userID, config.default_emoji, config.default_language, config.default_meme_channel)
        };
    };

    //get server from db, if null create new one
    async getServer() {
        const serverID = this.message.guild.id;
        this.server = await DAO.Servers.getOne(serverID);
        if (this.server === null) {
            this.server = await DAO.Servers.addOne(serverID, config.default_doEmojis, config.default_prefix)
        };
    };

    //get current avatar from db
    async getAvatar() {
        this.avatar = await DAO.Avatars.getActive();
    }

    //add emoji from db to message (if allowed on server)
    handleEmoji() {
        if (!this.server.doEmojis) return;

        const emoji = this.user.emojiID;
        if (emoji != null) {
            this.message.react(emoji)
        };
    };

    //if message contains command execute it using commands list
    handleCommand() {
        if (this.message.author.id != this.client.user.id) {
            //take from message command and args
            const content = this.message.content.trim();
            this.args = content.split(" ");
            this.command = this.args[0].toLowerCase();

            //iterate through all commands if matches call module
            this.commands.forEach(el => {
                el.name.forEach(name => {
                    if (this.server.prefix + name === this.command) new el.out(this);
                });
            });
        };
    };
};