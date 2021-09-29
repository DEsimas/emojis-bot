import { getAverageColor } from "fast-average-color-node";

import Handler from "./_handler.js";
import config from "./../config.js";

export default class readyHandler extends Handler {
    constructor(data) {
        super(data);
        this.readyHandler();
    };

    async readyHandler() {
        console.log(config.log.ready);

        //set status and regularly update it
        this.setActivity();
        setInterval(() => this.setActivity(), config.status_cooldown);

        //set regular UI update
        await this.setAvatars();
        setInterval(() => this.setAvatars(), config.avatar_cooldown);
    };
    
    //set bot statistics as activity
    async setActivity() {
        //get all servers and users
        const servers = await this.dao.getServers();
        const users = await this.dao.getUsers();
        
        this.client.user.setActivity(config.status[0] + servers.length + config.status[1] + users.length + config.status[2]);
        
        console.log(new Date().toString(), ": activity updated: ", config.status[0] + servers.length + config.status[1] + users.length + config.status[2], '\n')
    };
    
    //get avatars, after change UI
    async setAvatars() {
        await this.getAvatars()
        await this.setUI();
    };

    //get avatars from avatars channel and push em in db
    async getAvatars() {
        const avatars = await this.loadAvatars();
        const avatarsDB = await this.dao.getAvatars();
        //
        //compare avatars and avatarsDB
        //
        console.log(new Date().toString(), ": updating avatars(doin nothing)\n");
    };

    //compare two avatars (true if similar)
    comareAvatars(avatar1, avatar2) {
        if(
            avatar1.name === avatar2.name &&
            avatar1.imageURL === avatar2.imageURL &&
            avatar1.emojiID === avatar2.emojiID &&
            avatar1.color === avatar2.color &&
            avatar1.active === avatar2.active
            ) return true;
        return false
    }

    //returns array with UIs from avatars channel on support server (very cursed)
    async loadAvatars() {
        const messages = await this.getAvatarMessages();

        //get current avatar
        let current = await this.dao.getAvatar();
        if (!current) current = { name: null };

        let avatars = [];
        const msgs = messages.keys();

        //iterate through messages with avatars
        for (let i = 0; i < messages.size; i++) {
            const element = messages.get(msgs.next().value);

            //get fields
            const name = element.content;
            const imageURL = this.getImageUrlFromMessage(element);
            const emojiID = await this.getEmojiIdFromMessage(element);
            const color = await this.getColorFromAvatar(imageURL);
            const active = current.name === name;

            //add UI to list
            avatars.push({ name: name, imageURL: imageURL, emojiID: emojiID, color: color, active: active});
        };

        return avatars;
    };

    //return messages with bot avatars
    async getAvatarMessages() {
        const channel = await this.client.channels.fetch(config.avatar_channel_id);
        return await channel.messages.fetch();
    };

    //get avatar url
    getImageUrlFromMessage(message) {
        const attachmentID = message.attachments.keys().next().value;
        const attachment = message.attachments.get(attachmentID);
        return attachment.url;
    }

    //get emoji for avatar from messaje with this avatar
    async getEmojiIdFromMessage(message) {
        let emojiID = null;
        const keys = message.reactions.cache.keys();

        //iterater through reactions under single message
        for (let i = 0; i < message.reactions.cache.size; i++) {
            const reaction = message.reactions.cache.get(keys.next().value);

            //if reaction user is owner save its id
            if (await reaction.users.fetch().then(user => {
                if (user.entries().next().value[1].id == config.owner_id) return true;
                else return false;
            })) emojiID = reaction._emoji.id;
        };

        return emojiID;
    };

    //get color for embeds
    async getColorFromAvatar(url) {
        const color = await getAverageColor(url);
        return color.hex;
    };

    //pick random UI from db and set it
    async setUI() {
        //get new and old UI
        const avatars = await this.dao.getAvatars();
        const UI = avatars[Math.floor(Math.random() * avatars.length)];
        const prev = await this.dao.getAvatar();

        //try to set avatar if ok set nickname
        this.client.user.setAvatar(UI.imageURL).then(async () => {
            this.setNickname(UI.name);

            //update user in db
            await this.dao.updUser(this.client.user.id, { $set: { emojiID: UI.emojiID } });

            //update avatars activity in db
            if (prev) await this.dao.updAvatar(prev._id, { $set: { active: false } });
            await this.dao.updAvatar(UI._id, { $set: { active: true } });

            console.log(new Date().toString(), ": UI updated", UI.name, '\n');

        }).catch(async err => {
            console.log(new Date().toString(), "Can't update UI\n")
            
            //set current emoji to bot in db (cuz setting default values deleted it)
            await this.dao.updUser(this.client.user.id, { $set: { emojiID: prev.emojiID } });
        });
    };

    //set new nickname
    async setNickname(nickname) {
        this.client.guilds.cache.forEach(async el => {
            const user = await el.members.fetch(this.client.user.id)
            user.setNickname(nickname);
        });
    };
};