import { Client, Message } from "discord.js";

import { Server } from "../database/Servers";
import { User } from "../database/Users";
import { DAO } from "../database/DAO";
import { Log } from "../Log";

export class MessageHandler {
    private readonly DAO: DAO;
    private readonly client: Client;
    private readonly message: Message;
    private readonly user: User;
    private readonly server: Server;
    private readonly isDataFetched: boolean;

    constructor(client: Client, DAO: DAO, message: Message, user: User, server: Server | null) {
        this.isDataFetched = true;
        if(server === null) {
            Log.warning(`MessageHandler.ts:\tcouldn't save server to the database`);
            this.isDataFetched = false;
        }
        this.DAO = DAO;
        this.client = client;
        this.message = message;
        this.user = user;
        this.server = server || { serverID: "", doEmojis: false, prefix: "" };
    }
    
    public async handle(): Promise<void> {
        if(!this.isDataFetched) {
            Log.warning(`MessageHandler.ts:\tcouldn't save server to the database`);
            return;
        };

        console.log(this.user, this.server);
    }
}