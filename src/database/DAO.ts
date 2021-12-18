import { connect } from 'mongoose';
import { Log } from '../Log';
import { Avatars } from './Avatars';

export class DAO {
    public readonly Avatars: Avatars;

    constructor() {
        this.Avatars = new Avatars();
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