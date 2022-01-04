import { ICollections, Language } from "./Types"

export const collections: ICollections = {
    users: "users",
    servers: "servers",
    avatars: "avatars",
    notifications: "notifications",
    logs: "logs"
}

export const user: {emojiID: string | null, language: Language} = {
    emojiID: null,
    language: "eng"
}

export const server: {prefix: string, doEmojis: boolean} = {
    prefix: "|",
    doEmojis: false
}