export default class dao {
    constructor(settings) {
        this.settings = settings;
        this.mongoose = settings.mongoose;
        
        this.connectDB();
        this.emojis = this.mongoose.model(this.settings.db_collections.users, this.getUserSchema());
        this.servers = this.mongoose.model(this.settings.db_collections.servers, this.getServerSchema());
        this.avatars = this.mongoose.model(this.settings.db_collections.avatars, this.getAvatarSchema());
    };

    connectDB() {
        this.mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log(this.settings.log.db)
                this.setDefaults();
            })
            .catch(error => console.log(this.settings.log.db_error + error));
    };

    getUserSchema() {
        const userSchema = new this.mongoose.Schema({
            userID: String,
            emojiID: String,
            language: String
        });
        return userSchema;
    };

    getServerSchema() {
        const serverSchema = new this.mongoose.Schema({
            serverID: String,
            doEmojis: Boolean,
            prefix: String,
            memeChannel: String
        });
        return serverSchema;
    };

    getAvatarSchema() {
        const avatarSchema = new this.mongoose.Schema({
            name: String,
            imageURL: String,
            emojiID: String
        });
        return avatarSchema;
    };

    setDefaults() {
        this.settings.default_values.forEach(async el => {
            const data = await this.getUser(el.userID);
            if (JSON.stringify({ userID: data.userID, emojiID: data.emojiID, language: data.language }) != JSON.stringify(el)) {
                await this.delUser(el.userID);
                await this.addUser(el.userID, el.emojiID, el.language);
            };
        });
    };

    async addUser(userID, emojiID, language) {
        return await new this.emojis({ userID: userID, emojiID: emojiID, language: language }).save();
    };

    async getUser(userID) {
        return await this.emojis.findOne({ userID: userID });
    };

    async updUser(userID, options) {
        return await this.emojis.updateOne({ userID: userID }, options);
    };

    async delUser(userID) {
        return await this.emojis.deleteOne({ userID: userID });
    };

    async addServer(serverID, doEmojis, prefix) {
        return await new this.servers({ serverID: serverID, doEmojis: doEmojis, prefix: prefix }).save();
    };

    async getServer(serverID) {
        return await this.servers.findOne({ serverID: serverID });
    };

    async updServer(serverID, options) {
        return await this.servers.updateOne({ serverID: serverID }, options);
    };

    async delServer(serverID) {
        return await this.servers.deleteOne({ serverID: serverID });
    };

    async addAvatar(name, imageURL, emojiID) {
        return await this.avatars({ name: name, imageURL, emojiID }).save();
    };

    async getAvatar() {
        return await this.avatars.find();
    };

    async getAvatars() {
        return await this.avatars.findOne({ id: _id });
    };
    
    async updAvatar(_id, options) {
        return await this.avatars.updateOne({ _id: _id }, options);
    };

    async delAvatar(_id) {
        return await this.avatars.deleteOne({ _id: _id });
    };

    async delAvatars() {
        return await this.avatars.deleteMany({});
    };
};