import { model, Model, Schema, UpdateQuery } from "mongoose";
import { collections } from "../config/Database";

export interface Log {
    type: "error" | "warning" | "info";
    time: Date;
    origin: string;
    message: string;
    payload: string;
};

export class Logs {
    private readonly LogsModel: Model<Log>;

    constructor() {
        this.LogsModel = model<Log>(collections.logs, this.getLogSchema());
    }

    private getLogSchema(): Schema<Log> {
        return new Schema<Log>({
            type: String,
            time: Date,
            origin: String,
            message: String,
            payload: String
        });
    }

    public async insertOne(log: Log): Promise<Log> {
        return new this.LogsModel(log).save();
    }
}