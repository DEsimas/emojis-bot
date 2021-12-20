import { Notifications } from './Notifications';
import { Avatars } from './Avatars';
import { Servers } from './Servers';
import { Users } from './Users';
import { Log } from '../Log';

import { connect } from 'mongoose';

export class DAO {
    public Users: Users;
    public Avatars: Avatars;
    public Servers: Servers;
    public Notifications: Notifications;

    constructor() {
        this.Users = new Users();
        this.Avatars = new Avatars();
        this.Servers = new Servers();
        this.Notifications = new Notifications();
    }

    public async connect(uri: string): Promise<void> {
        return connect(uri, error => {
            if (error) {
                Log.error(`DAO.ts:\tcan't connect database\nuri: ${uri}\n${error}`);
                return;
            }
            
            Log.info("DAO.ts:\tdatabase connected");
        });
    }
};