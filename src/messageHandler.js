//modules for executing commands
import getHentai from "./components/hentai/getHentai.js";
import deleteEmoji from "./components/user-interaction/deleteEmoji.js";
import setLanguage from "./components/user-interaction/setLanguage.js";
// import setPrefix from "./components/server-interaction/setPrefix.js";
// import doEmojis from "./components/server-interaction/doEmojis.js";
import setEmoji from "./components/user-interaction/setEmoji.js";
// import imgToAscII from "./components/imgToAscII/imgToAscII.js";
// import clear from "./components/interaction/clear.js";
// import help from "./components/interaction/help.js";

export default class messageHandler {
    constructor(context) {
        this.context = context;

        this.setCommandList();
        this.setInfo()
            .then(() => {
                this.handleEmoji();
                this.handleCommand();
            })
            .catch(error => console.log(this.context.config.log.db_error + error));
    };


    //find server and user in db and save into context
    async setInfo() {
        const userID = this.context.message.author.id;
        let user = await this.context.dao.getUser(userID);
        if (user == null) {
            user = await this.context.dao.addUser(userID, this.context.config.default_emoji, this.context.config.default_language, this.context.config.default_meme_channel)
                .catch(error => console.log(this.context.config.log.db_error + error));
        };
        this.context.user = user;

        const serverID = this.context.message.guild.id;
        let server = await this.context.dao.getServer(serverID);
        if (server == null) {
            server = await this.context.dao.addServer(serverID, this.context.config.default_doEmojis, this.context.config.default_prefix, this.context.config.default_meme_channel)
                .catch(error => console.log(this.config.log.db_error + error));
        };
        this.context.server = server;
    };

    //add emoji from db to message (if allowed on server)
    handleEmoji() {
        if (!this.context.server.doEmojis) return;
        const emoji = this.context.user.emojiID;
        if (emoji != null) {
            this.context.message.react(emoji);
        };
    };

    //if message contains command execute it using commands list
    handleCommand() {
        if (this.context.message.author.id != this.context.client.user.id) {
            const content = this.context.message.content.trim();
            const args = content.split(" ");
            this.context.args = args;
            const command = args[0].toLowerCase();

            this.context.commands.forEach(el => {
                el.name.forEach(name => {
                    if (this.context.server.prefix + name == command) new el.out(this.context);
                });
            });
        };
    };

    //list with all bots commands
    setCommandList() {
        const name = this.context.config.commands;
        this.context.commands = [
            // {
            //     name: name.imgToAscII,
            //     out: imgToAscII
            // },
            {
                name: name.getHentai,
                out: getHentai
            },
            // {
            //     name: name.clear,
            //     out: clear
            // },
            // {
            //     name: name.help,
            //     out: help
            // },
            // {
            //     name: name.setPrefix,
            //     out: setPrefix
            // },
            // {
            //     name: name.doEmojis,
            //     out: doEmojis
            // },
            {
                name: name.setLanguage,
                out: setLanguage
            },
            {
                name: name.setEmoji,
                out: setEmoji
            },
            {
                name: name.deleteEmoji,
                out: deleteEmoji
            }
        ];
    };
};