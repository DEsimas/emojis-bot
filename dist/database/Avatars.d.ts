import { ColorResolvable } from "discord.js";
import { UpdateQuery } from "mongoose";
export interface Avatar {
    name: string;
    imageURL: string;
    emojiID: string;
    color: ColorResolvable;
    active: boolean;
}
export declare class Avatars {
    private readonly AvatarsModel;
    constructor();
    private getAvatarSchema;
    count(): Promise<number>;
    switchActive(name: string): Promise<UpdateQuery<Notification>>;
    getActive(): Promise<Avatar | null>;
    getNotActive(): Promise<Avatar[]>;
    getAll(): Promise<Avatar[]>;
    insertOne(avatar: Avatar): Promise<Avatar>;
    insertMany(avatars: Avatar[]): Promise<Avatar[]>;
    updateOneByName(name: string, options: UpdateQuery<Avatar>): Promise<UpdateQuery<Avatar>>;
    deleteOneById(_id: string): Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
    deleteAll(): Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
}
