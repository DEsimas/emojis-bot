import { Notifications } from './Notifications';
import { Avatars } from './Avatars';
import { Servers } from './Servers';
import { Users } from './Users';
import { Logs } from './Logs';
export declare class DAO {
    static readonly Users: Users;
    static readonly Avatars: Avatars;
    static readonly Servers: Servers;
    static readonly Notifications: Notifications;
    static readonly Logs: Logs;
    static connect(uri: string): Promise<void>;
}
