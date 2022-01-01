import { Notifications } from './Notifications';
import { Avatars } from './Avatars';
import { Servers } from './Servers';
import { Users } from './Users';
import { Logs } from './Logs';
import { Log } from '../Log';

import { connect } from 'mongoose';

export class DAO {
    public static readonly Users = new Users();
    public static readonly Avatars = new Avatars();
    public static readonly Servers = new Servers();
    public static readonly Notifications = new Notifications();
    public static readonly Logs = new Logs();

    public static async connect(uri: string): Promise<void> {
        connect(uri, error => {
            if (error) throw new Error("Cant connect database");
            Log.info("DAO.ts", "Database connected");
        });
    }
};