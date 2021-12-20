import { Config, config } from "../config";

import { model, Model, Schema } from "mongoose";

export interface Notification {
    userID: string;
    birth: Date;
};

export class Notifications {
    private readonly config: Config;
    private readonly NotificationModel: Model<Notification>;

    constructor() {
        this.config = config;
        this.NotificationModel = model<Notification>(this.config.database.collections.notifications, this.getNotificationSchema());
    }

    private getNotificationSchema(): Schema<Notification> {
        return new Schema<Notification>({
            userID: String,
            birth: Date
        });
    }

    async getAll(): Promise<Notification[]> {
        return this.NotificationModel.find({});
    }

    async findByUserId(userID: string): Promise<Notification | null> {
        return this.NotificationModel.findOne({ userID: userID });
    }

    async insertOne(notification: Notification): Promise<Notification> {
        return new this.NotificationModel(notification).save();
    }

    async deleteByUserId(userID: string): Promise<boolean> {
        if((await this.NotificationModel.deleteOne({ userID: userID })).deletedCount === 1) return true;
        return false;
    }
};