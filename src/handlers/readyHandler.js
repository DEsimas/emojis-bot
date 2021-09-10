import { getAverageColor } from "fast-average-color-node";

import Handler from "./_handler.js";
import config from "./../config.js";

export default class readyHandler extends Handler {
    constructor(data) {
        super(data);
        this.readyHandler();
    };

    readyHandler() {
        console.log(config.log.ready);

        //set status and regularly update it
        this.setActivity();
        setInterval(() => this.setActivity(), config.status_cooldown);

        //get avatars, after change UI
        this.getAvatars().then(() => this.setUI());

        //set regular getting avatars and setting UI
        setInterval(() => this.getAvatars(), config.push_cooldown);
        setInterval(() => this.setUI(), config.avatar_cooldown);
    };

    //set bot statistics as activity
    async setActivity() {
        const servers = await this.dao.getServers();
        const users = await this.dao.getUsers();

        this.client.user.setActivity(config.status[0] + servers.length + config.status[1] + users.length + config.status[2]);
    };

    //get avatars from avatars channel and push em in db
    async getAvatars() {
        this.loadAvatars().then(async avatars => {
            await this.dao.delAvatars();
            avatars.forEach(el => this.dao.addAvatar(el.name, el.imageURL, el.emojiID, el.color, el.active));
        });
    };

    //returns array with UIs from avatars channel on support server (very cursed)
    async loadAvatars() {
        const channel = await this.client.channels.fetch(config.avatar_channel_id);
        const messages = await channel.messages.fetch();

        let avatars = [];
        const msgs = messages.keys();
        let current = await this.dao.getAvatar();
        if(!current) current = { name: null };
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

            //get color
            const color = await getAverageColor(attachment.url);

            //add UI to list
            avatars.push({
                name: element.content,
                imageURL: attachment.url,
                emojiID: emojiID,
                color: color.hex,
                active: current.name === element.content ? true : false
            });
        };

        return avatars;
    };

    //pick random UI from db and set it
    async setUI() {
        const avatars = await this.dao.getAvatars();
        const UI = avatars[Math.floor(Math.random() * avatars.length)];
        const prev = await this.dao.getAvatar();

        this.client.user.setAvatar(UI.imageURL).then(async () => {
            this.client.guilds.cache.forEach(async el => {
                const user = await el.members.fetch(this.client.user.id)
                user.setNickname(UI.name);
            });

            this.dao.updUser(this.client.user.id, { $set: { emojiID: UI.emojiID } });

            //update avatars in db
            if(prev) await this.dao.updAvatar(prev._id, { $set: { active: false } });
            await this.dao.updAvatar(UI._id, { $set: { active: true } });

        }).catch(err => console.log(err+""));
    };
};