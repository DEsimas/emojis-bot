import { model, Model, Schema, UpdateQuery } from "mongoose";
import { Language } from "../config/Types";
import { collections, user as defUser } from "./../config/Database";

export interface User {
    userID: string;
    emojiID: string | null;
    language: Language;
};

export class Users {
    private readonly UsersModel: Model<User>;

    constructor() {
        this.UsersModel = model<User>(collections.users, this.getUserSchema());
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

    public async fetchByUserId(userID: string): Promise<User> {
        const user = await this.UsersModel.findOne({ userID: userID });
        if(user) return user;

        return this.insertOne({ userID: userID, ...defUser });
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