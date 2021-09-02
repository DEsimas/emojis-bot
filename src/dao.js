export default class dao {
    constructor(settings) {
        this.settings = settings;
        this.mongoose = settings.mongoose;
        
        this.connectDB();
        this.emojis = this.mongoose.model(this.settings.db_collections.users, this.getUserSchema());
        this.servers = this.mongoose.model(this.settings.db_collections.servers, this.getServerSchema());
    };

    connectDB() {
        this.mongoose.connect(this.settings.url, { useNewUrlParser: true, useUnifiedTopology: true })
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


    setDefaults() {
        this.settings.default_values.forEach(async el => {
            const data = await this.getUser(el.userID);
            if (data == null) {
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

    async addServer(serverID, doEmojis, prefix, memeChannel) {
        return await new this.servers({ serverID: serverID, doEmojis: doEmojis, prefix: prefix, memeChannel: memeChannel }).save();
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
};