import { Notifications } from './Notifications';
import { Avatars } from './Avatars';
import { Servers } from './Servers';
import { Users } from './Users';
import { Log } from '../Log';

import { connect } from 'mongoose';

export class DAO {
    public static readonly Users = new Users();
    public static readonly Avatars = new Avatars();
    public static readonly Servers = new Servers();
    public static readonly Notifications = new Notifications();

    public static async connect(uri: string): Promise<void> {
        return connect(uri, error => {
            if (error) {
                Log.error(`DAO.ts:\tcan't connect database\nuri: ${uri}\n${error}`);
                return;
            }
            
            Log.info("DAO.ts:\tdatabase connected");
        });
    }
};