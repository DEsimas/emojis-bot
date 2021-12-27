import { Log } from './Log';
import { Client, ClientEvents } from 'discord.js';
import { EventHandler } from './handlers/_EventHandler';

export interface Options {
    token: string;
    intents: number[];
    events: Record<keyof ClientEvents, typeof EventHandler>;
};

export class Bot {
    private readonly client: Client;
    private readonly intents: number[];
    private readonly token: string;
    private readonly events: Record<keyof ClientEvents, typeof EventHandler>;

    constructor(options: Options) {
        this.token = options.token;
        this.intents = options.intents;
        this.events = options.events;
        this.client = new Client({ intents: this.intents });
        this.setHandlers();
    }

    public login(): void {
        this.client.login(this.token).then(token => {
            Log.info("Bot.ts", `logged in`, { token: token });
        }).catch(error => {
            Log.error("Bot.ts", "failed to log in", {token: this.token, error: error});
            throw new Error(error);
        });
    }
    
    private setHandlers(): void {
        let event: keyof ClientEvents;
        for(event in this.events) {
            this.client.on(event, (...params) => new this.events[event]({ client: this.client, ...params}).handle());
        }
    }
};