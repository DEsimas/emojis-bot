import { connect } from 'mongoose';
import { Log } from '../Log';
import { Avatars } from './Avatars';
import { Notifications } from './Notifications';

export class DAO {
    public readonly Avatars: Avatars;
    public readonly Notifications: Notifications;

    constructor() {
        this.Avatars = new Avatars();
        this.Notifications = new Notifications();
    }

    public async connect(uri: string): Promise<DAO> {
        connect(uri, error => {
            if(error) {
                Log.error(`Can't connect database\nuri: ${uri}\n${error}`);
                return;
            }

            Log.info("Database connected");
        });

        return this;
    }
};