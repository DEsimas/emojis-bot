export interface Log {
    type: "error" | "warning" | "info";
    time: Date;
    origin: string;
    message: string;
    payload: string;
}
export declare class Logs {
    private readonly LogsModel;
    constructor();
    private getLogSchema;
    insertOne(log: Log): Promise<Log>;
}
