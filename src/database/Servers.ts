import { model, Model, Schema, UpdateQuery } from "mongoose";
import { config } from "../config";

export interface Server {
    serverID: string;
    doEmojis: boolean;
    prefix: string;
};

export class Servers {
    private readonly config: typeof config;
    private readonly ServersModel: Model<Server>;

    constructor() {
        this.config = config;
        this.ServersModel = model<Server>(this.config.database.collections.servers, this.getServerSchema());
    }

    private getServerSchema(): Schema<Server> {
        return new Schema<Server>({
            serverID: String,
            doEmojis: Boolean,
            prefix: String
        });
    }

    async getAll(): Promise<Server[]> {
        return this.ServersModel.find({});
    }

    async findByServerId(serverID: string): Promise<Server | null> {
        return this.ServersModel.findOne({ serverID: serverID });
    }

    async insertOne(server: Server): Promise<Server> {
        return new this.ServersModel(server).save();
    }

    async updateOneByServerId(serverID: string, options: UpdateQuery<Server>): Promise<UpdateQuery<Server>> {
        return await this.ServersModel.updateOne({ serverID: serverID }, options);
    }

    async deleteOneByServerId(serverID: string): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return await this.ServersModel.deleteOne({ serverID: serverID });
    }
}