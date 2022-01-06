import { model, Model, Schema, UpdateQuery } from "mongoose";
import { collections, server as defServer } from "./../config/Database";

export interface Server {
    serverID: string;
    doEmojis: boolean;
    doGreetings: boolean;
    prefix: string;
};

export class Servers {
    private readonly ServersModel: Model<Server>;

    constructor() {
        this.ServersModel = model<Server>(collections.servers, this.getServerSchema());
    }

    private getServerSchema(): Schema<Server> {
        return new Schema<Server>({
            serverID: String,
            doEmojis: Boolean,
            doGreetings: Boolean,
            prefix: String
        });
    }

    public async count(): Promise<number> {
        return this.ServersModel.countDocuments({});
    }

    public async getAll(): Promise<Server[]> {
        return this.ServersModel.find({});
    }

    public async fetchByServerId(serverID: string): Promise<Server> {
        const server = await this.ServersModel.findOne({ serverID: serverID });
        if(server) return server;

        return this.insertNew(serverID);
    }

    public async insertNew(serverID: string): Promise<Server> {
        return this.insertOne({ serverID: serverID, ...defServer });
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