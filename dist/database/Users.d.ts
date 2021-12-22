import { UpdateQuery } from "mongoose";
export declare type Language = 'rus' | 'eng';
export interface User {
    userID: string;
    emojiID: string | null;
    language: Language;
}
export declare class Users {
    private readonly UsersModel;
    constructor();
    private getUserSchema;
    count(): Promise<number>;
    getAll(): Promise<User[]>;
    fetchByUserId(userID: string): Promise<User>;
    insertOne(user: User): Promise<User>;
    updateByUserId(userID: string, options: UpdateQuery<User>): Promise<UpdateQuery<User>>;
    deleteByUserId(userID: string): Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
}
