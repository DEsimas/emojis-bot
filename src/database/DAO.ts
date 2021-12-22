import { Notifications } from './Notifications.js';
import { Avatars } from './Avatars.js';
import { Servers } from './Servers.js';
import { Users } from './Users.js';
import { Logs } from './Logs.js';
import { Log } from '../Log.js';

import { connect } from 'mongoose';

export class DAO {
    public static readonly Users = new Users();
    public static readonly Avatars = new Avatars();
    public static readonly Servers = new Servers();
    public static readonly Notifications = new Notifications();
    public static readonly Logs = new Logs();

    public static async connect(uri: string): Promise<void> {
        return connect(uri, error => {
            if (error) {
                Log.error("DAO.ts", `Can't connect database`, { uri: uri, error: error});
                return;
            }
            
            Log.info("DAO.ts", "Database connected");
        });
    }
};