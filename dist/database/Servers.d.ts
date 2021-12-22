import { UpdateQuery } from "mongoose";
export interface Server {
    serverID: string;
    doEmojis: boolean;
    prefix: string;
}
export declare class Servers {
    private readonly ServersModel;
    constructor();
    private getServerSchema;
    count(): Promise<number>;
    getAll(): Promise<Server[]>;
    fetchByServerId(serverID: string): Promise<Server>;
    insertNew(serverID: string): Promise<Server>;
    insertOne(server: Server): Promise<Server>;
    updateOneByServerId(serverID: string, options: UpdateQuery<Server>): Promise<UpdateQuery<Server>>;
    deleteOneByServerId(serverID: string): Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
}
