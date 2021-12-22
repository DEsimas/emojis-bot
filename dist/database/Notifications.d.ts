export interface Notification {
    userID: string;
    birth: Date;
}
export declare class Notifications {
    private readonly NotificationModel;
    constructor();
    private getNotificationSchema;
    getAll(): Promise<Notification[]>;
    findByUserId(userID: string): Promise<Notification | null>;
    insertOne(notification: Notification): Promise<Notification>;
    deleteByUserId(userID: string): Promise<boolean>;
}
