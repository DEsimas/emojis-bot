import { getAverageColor } from "fast-average-color-node";

import Handler from "./_handler.js";
import config from "./../config.js";
import Log from "../logger.js";

export default class readyHandler extends Handler {
    constructor(data) {
        super(data);
        this.readyHandler();
    };

    async readyHandler() {
        Log.info(config.log.ready);

        //set status and regularly update it
        this.setActivity();
        setInterval(() => this.setActivity(), config.status_cooldown);

        //set regular UI update
        await this.setAvatars();
        setInterval(async () => await this.setAvatars(), config.avatar_cooldown);
    };
    
    //set bot statistics as activity
    async setActivity() {
        //get all servers and users
        const servers = await this.dao.getServers();
        const users = await this.dao.getUsers();
        
        const activity = config.status[0] + servers.length + config.status[1] + users.length + config.status[2];
        this.client.user.setActivity(activity);

        Log.info(activity);
    };
    
    //get avatars, after change UI
    async setAvatars() {
        const avatars = await this.getAvatars()
        await this.setUI(avatars);
    };

    //get avatars from avatars channel and push em in db
    async getAvatars() {
        const avatars = await this.loadAvatars();
        const avatarsDB = await this.dao.getAvatars();

        //please someone remake it
        //   |
        //   |
        //  \ /
        //   *
        await this.dao.delAvatars();

        for(let i in avatars) {

            const avatar = avatars[i];
            await this.dao.addAvatar(avatar.name, avatar.imageURL, avatar.emojiID, avatar.color, avatar.active);
        };

        Log.info("UI's loaded");

        return avatars;
    };

    //compare two avatars (true if similar)
    compareAvatars(avatar1, avatar2) {
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
    async setUI(avatars) {
        Log.info("UI update start");
        //get new and old UI
        const UI = avatars[Math.floor(Math.random() * avatars.length)];
        const prev = avatars.filter(el => (el.active))[0];

        //try to set avatar if ok set nickname
        this.client.user.setAvatar(UI.imageURL).then(async () => {
            Log.info("avatar updated")

            this.setNickname(UI.name);

            //update user in db
            await this.dao.updUser(this.client.user.id, { $set: { emojiID: UI.emojiID } });
            Log.info("user in db updated");

            //update avatars activity in db
            if (prev) await this.dao.updAvatar(prev.name, { $set: { active: false } });
            await this.dao.updAvatar(UI.name, { $set: { active: true } });
            Log.info("avatar in db updated");

            Log.info("UI updated");
        }).catch(async err => {
            Log.warning("Can't update UI");
            
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