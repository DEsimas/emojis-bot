import { config } from "../config";

import { model, Model, Schema, UpdateQuery } from "mongoose";

export interface User {
    userID: string;
    emojiID: string | null;
    language: 'rus' | 'eng';
};

export class Users {
    private readonly UsersModel: Model<User>;

    constructor() {
        this.UsersModel = model<User>(config.database.collections.users, this.getUserSchema());
    }

    private getUserSchema(): Schema<User> {
        return new Schema<User>({
            userID: String,
            emojiID: String || null,
            language: String
        });
    }

    public async count(): Promise<number> {
        return this.UsersModel.countDocuments({});
    }

    public async getAll(): Promise<User[]> {
        return this.UsersModel.find({});
    }

    public async findByUserId(userID: string): Promise<User | null> {
        return this.UsersModel.findOne({ userID: userID });
    }

    public async insertOne(user: User): Promise<User> {
        return new this.UsersModel(user).save();
    }

    public async updateByUserId(userID: string, options: UpdateQuery<User>): Promise<UpdateQuery<User>> {
        return this.UsersModel.updateOne({ userID: userID }, options);
    }

    public async deleteByUserId(userID: string): Promise<{ acknowledged: boolean, deletedCount: number}> {
        return this.UsersModel.deleteOne({ userID: userID });
    }
};