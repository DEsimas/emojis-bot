export declare class Bot {
    private readonly client;
    private readonly intents;
    private readonly events;
    constructor();
    connectDB(uri?: string): Promise<void>;
    login(token?: string): void;
}
