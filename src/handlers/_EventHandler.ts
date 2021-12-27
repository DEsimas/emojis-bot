import { Client, Guild, Message } from "discord.js";

export interface Payload {
    client: Client;
    message?: Message;
    guild?: Guild;
};

export class EventHandler {
    protected readonly client: Client;
    protected readonly message: Message | undefined;
    protected readonly guild: Guild | undefined;

    constructor(payload: Payload) {
        this.client = payload.client;
        this.message = payload.message;
        this.guild = payload.guild;
        console.log(Object.keys(payload));
    }

    public handle(): void {
        throw new Error("Method not implemented.");
    }
}