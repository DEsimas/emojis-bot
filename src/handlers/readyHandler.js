export default class readyHandler {
    constructor(context) {
        this.client = context.client;
        this.config = context.config;
        this.log = this.config.log;
        this.dao = context.dao;

        this.readyHandler();
    };

    readyHandler() {
        console.log(this.log.ready);

        //set regular checking for new avatars & regular UI changing
        this.UI();
        this.pushAvatars(this.client, this.config, this.dao, this.loadAvatars);
        setInterval(this.pushAvatars, this.config.push_cooldown, this.client, this.config, this.dao, this.loadAvatars);
    };
    
    //get avatars from avatars channel and push em in db
    async pushAvatars(client, config, dao, loadAvatars) {
        loadAvatars(client, config).then(async avatars => {
            await dao.delAvatars();
            avatars.forEach(el => {
                dao.addAvatar(el.name, el.imageURL, el.emojiID);
            });
        });
    }

    //returns array with UIs from avatars channel on support server (very cursed)
    async loadAvatars(client, config) {

        const channel = client.channels.cache.get(config.avatar_channel_id);
        const messages = await channel.messages.fetch();

        let avatars = [];
        const msgs = messages.keys();
        //iterater through messages in channel
        for (let i = 0; i < messages.size; i++) {
            const element = messages.get(msgs.next().value);
            
            let emojiID = null;
            const keys = element.reactions.cache.keys();

            //iterater through reactions under single message
            for (let i = 0; i < element.reactions.cache.size; i++) {
                const reaction = element.reactions.cache.get(keys.next().value);

                //if reaction user is owner save its id
                if (await reaction.users.fetch().then(user => {
                    if (user.entries().next().value[1].id == config.owner_id) return true;
                    else return false;
                })) emojiID = reaction._emoji.id;
            };

            //get image url from attachment
            const attachmentID = element.attachments.keys().next().value;
            const attachment = element.attachments.get(attachmentID);

            //add UI to list
            avatars.push({
                name: element.content,
                imageURL: attachment.url,
                emojiID: emojiID
            });
        };

        return avatars;
    };

    //set new UI on initialization and setInterval for regular changes
    UI() {
        this.setUI(this.dao, this.client, this.config.avatar_error);
        setInterval(this.setUI, this.config.avatar_cooldown, this.dao, this.client, this.config.avatar_error);
    };

    //pick random UI from db and set it
    async setUI(dao, client, error_msg) {
        const avatars = await dao.getAvatars();
        const UI = avatars[Math.floor(Math.random() * avatars.length)];
        
        client.user.setAvatar(UI.imageURL).then(() => {
            client.guilds.cache.forEach(el => {
                el.member(client.user).setNickname(UI.name);
            });
            dao.updUser(client.user.id, { $set: { emojiID: UI.emojiID } });
        })
        .catch(err => {
            console.log(error_msg + err);
        });
    };
};