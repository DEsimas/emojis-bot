import { Connection, Model, Schema } from "mongoose";
import { collections } from "./../config/Database";

export interface Notification {
    userID: string;
    birth: Date;
};

export class Notifications {
    private readonly NotificationModel: Model<Notification>;

    constructor(connection: Connection) {
        this.NotificationModel = connection.model<Notification>(collections.notifications, this.getNotificationSchema());
    }

    private getNotificationSchema(): Schema<Notification> {
        return new Schema<Notification>({
            userID: String,
            birth: Date
        });
    }

    public async getAll(): Promise<Notification[]> {
        return this.NotificationModel.find({});
    }

    public async findByUserId(userID: string): Promise<Notification | null> {
        return this.NotificationModel.findOne({ userID: userID });
    }

    public async insertOne(notification: Notification): Promise<Notification> {
        return new this.NotificationModel(notification).save();
    }

    public async deleteByUserId(userID: string): Promise<boolean> {
        if((await this.NotificationModel.deleteOne({ userID: userID })).deletedCount === 1) return true;
        return false;
    }
};