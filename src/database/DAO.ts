import { Notifications } from './Notifications';
import { Avatars } from './Avatars';
import { Servers } from './Servers';
import { Users } from './Users';
import { Logs } from './Logs';

import { createConnection } from 'mongoose';

export class DAO {
    public static Users: Users;
    public static Avatars: Avatars;
    public static Servers: Servers;
    public static Notifications: Notifications;
    public static Logs: Logs;

    public static async connect(uri: string): Promise<void> {
        const connection = createConnection(uri);

        this.Users = new Users(connection);
        this.Avatars = new Avatars(connection);
        this.Servers = new Servers(connection);
        this.Notifications = new Notifications(connection);
        this.Logs = new Logs(connection);
    }
};