import { connect } from 'mongoose';
import { Log } from '../Log';
import { Avatars } from './Avatars';
import { Notifications } from './Notifications';
import { Servers } from './Servers';
import { Users } from './Users';

export class DAO {
    public readonly Users: Users;
    public readonly Avatars: Avatars;
    public readonly Servers: Servers;
    public readonly Notifications: Notifications;

    constructor() {
        this.Users = new Users();
        this.Avatars = new Avatars();
        this.Servers = new Servers();
        this.Notifications = new Notifications();
    }

    public async connect(uri: string): Promise<void> {
        return connect(uri, error => {
            if (error) {
                Log.error(`Can't connect database\nuri: ${uri}\n${error}`);
                return;
            }
            
            Log.info("Database connected");
        });
    }
};