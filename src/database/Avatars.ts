import { model, Model, Schema } from "mongoose";
import { config } from "../config";

export interface Avatar {
    name: string;
    imageURL: string;
    emojiID: string;
    color: string;
    active: boolean;
};

export class Avatars {
    private readonly config: typeof config;
    private readonly AvatarsModel: Model<Avatar>;

    constructor() {
        this.config = config;
        this.AvatarsModel = model<Avatar>(this.config.database.collections.avatars, this.getAvatarSchema());
    }

    private getAvatarSchema(): Schema {
        return new Schema<Avatar>({
            name: String,
            imageURL: String,
            emojiID: String,
            color: String,
            active: Boolean
        });
    };

    public async getActive(): Promise<Avatar | null> {
        return this.AvatarsModel.findOne({ active: true });
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

    public async deleteOneById(_id: string): Promise<boolean> {
        if((await this.AvatarsModel.deleteOne({ _id: _id })).deletedCount === 1) return true;
        return false;
    }

    public async deleteAll(): Promise<boolean> {
        if((await this.AvatarsModel.deleteMany({})).deletedCount === 0) return false;
        return true;
    }
}