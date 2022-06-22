import { ColorResolvable } from "discord.js";
import { Connection, Model, Schema, UpdateQuery } from "mongoose";
import { collections } from "./../config/Database";

export interface Avatar {
    name: string;
    imageURL: string;
    emojiID: string;
    color: ColorResolvable;
    active: boolean;
};

export class Avatars {
    private readonly AvatarsModel: Model<Avatar>;

    constructor(connection: Connection) {
        this.AvatarsModel = connection.model<Avatar>(collections.avatars, this.getAvatarSchema());
    }

    private getAvatarSchema(): Schema<Avatar> {
        return new Schema<Avatar>({
            name: String,
            imageURL: String,
            emojiID: String,
            color: String,
            active: Boolean
        });
    };

    public async count(): Promise<number> {
        return this.AvatarsModel.countDocuments();
    }

    public async switchActive(name: string): Promise<UpdateQuery<Notification>> {
        await this.AvatarsModel.updateOne({ active: true }, {active: false });
        return this.AvatarsModel.updateOne( { name: name }, { active: true });
    }

    public async getActive(): Promise<Avatar | null> {
        return this.AvatarsModel.findOne({ active: true });
    }

    public async getNotActive(): Promise<Avatar[]> {
        return this.AvatarsModel.find({ active: false });
    }

    public async getAll(): Promise<Avatar[]> {
        return this.AvatarsModel.find({});
    }

    public async insertOne(avatar: Avatar): Promise<Avatar> {
        return new this.AvatarsModel(avatar).save();
    }

    public async insertMany(avatars: Avatar[]): Promise<Avatar[]> {
        return this.AvatarsModel.insertMany(avatars);
    }

    public async updateOneByName(name: string, options: UpdateQuery<Avatar>): Promise<UpdateQuery<Avatar>> {
        return this.AvatarsModel.updateOne({ name: name }, options);
    }

    public async deleteOneById(_id: string): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return this.AvatarsModel.deleteOne({ _id: _id });
    }

    public async deleteAll(): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return this.AvatarsModel.deleteMany({});
    }
}