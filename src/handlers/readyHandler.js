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
        this.UI();
        this.loadAvatars().then(async avatars => {
            await this.dao.delAvatars();
            avatars.forEach(el => {
                this.dao.addAvatar(el.name, el.imageURL, el.emojiID);
            });
        });
    };

    async loadAvatars() {

        const channel = this.client.channels.cache.get(this.config.avatar_channel_id);
        const messages = await channel.messages.fetch();

        let avatars = [];
        const msgs = messages.keys();
        for (let i = 0; i < messages.size; i++) {
            const element = messages.get(msgs.next().value);
            let emojiID = null;

            const keys = element.reactions.cache.keys();
            for (let i = 0; i < element.reactions.cache.size; i++) {
                const reaction = element.reactions.cache.get(keys.next().value);

                if (await reaction.users.fetch().then(user => {
                    if (user.entries().next().value[1].id == this.config.owner_id) return true;
                    else return false;
                })) emojiID = reaction._emoji.id;
            };

            const attachmentID = element.attachments.keys().next().value;
            const attachment = element.attachments.get(attachmentID);

            avatars.push({
                name: element.content,
                imageURL: attachment.url,
                emojiID: emojiID
            });
        };

        return avatars;
    };

    UI() {
        this.setUI(this.dao, this.client, this.config.avatar_error);
        setInterval(this.setUI, this.config.avatar_cooldown, this.dao, this.client, this.config.avatar_error);
    };

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