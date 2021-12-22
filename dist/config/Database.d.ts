import { Language } from "../database/Users";
export interface ICollections {
    users: string;
    servers: string;
    avatars: string;
    notifications: string;
    logs: string;
}
export declare const collections: ICollections;
export declare const user: {
    emojiID: string | null;
    language: Language;
};
export declare const server: {
    prefix: string;
    doEmojis: boolean;
};
