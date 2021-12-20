import { config } from "../config";

import { model, Model, Schema, UpdateQuery } from "mongoose";

export interface Server {
    serverID: string;
    doEmojis: boolean;
    prefix: string;
};

export class Servers {
    private readonly ServersModel: Model<Server>;

    constructor() {
        this.ServersModel = model<Server>(config.database.collections.servers, this.getServerSchema());
    }

    private getServerSchema(): Schema<Server> {
        return new Schema<Server>({
            serverID: String,
            doEmojis: Boolean,
            prefix: String
        });
    }

    public async count(): Promise<number> {
        return this.ServersModel.countDocuments({});
    }

    public async getAll(): Promise<Server[]> {
        return this.ServersModel.find({});
    }

    public async findByServerId(serverID: string): Promise<Server | null> {
        return this.ServersModel.findOne({ serverID: serverID });
    }

    public async insertOne(server: Server): Promise<Server> {
        return new this.ServersModel(server).save();
    }

    public async updateOneByServerId(serverID: string, options: UpdateQuery<Server>): Promise<UpdateQuery<Server>> {
        return await this.ServersModel.updateOne({ serverID: serverID }, options);
    }

    public async deleteOneByServerId(serverID: string): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return await this.ServersModel.deleteOne({ serverID: serverID });
    }
}