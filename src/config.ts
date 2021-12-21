import { ColorResolvable } from "discord.js";

export const config: Config = {
    "administrator_permission": "ADMINISTRATOR",
    "scan_limit": 100,
    "status": "on ${servers} servers with ${users} users",
    "cron": {
        "notifications": "0 0 * * *",
        "UI": "*/5 * * * *",
    },
    "events": {
        "ready": "ready",
        "message": "messageCreate",
        "guildCreate": "guildCreate",
        "guildDelete": "guildDelete"
    },
    "embed_colors": {
        "error": "#ff0000",
        "success": "#00ff00",
        "discord": "#202225"
    },
    "ids": {
        "avatars_channel": "885941024478883873",
        "support_server": "885941024478883870"
    },
    "emojis": {
        "link": "https://cdn.discordapp.com/emojis/",
        "extension": ".png"
    },
    "img_to_ascii": {
        "options": {
            "fit": "box",
            "width": 150,
            "height": 75,
            "color": false
        },
        "file_name": "./ascII.txt"
    },
    "database": {
        "collections": {
            "users": "users",
            "servers": "servers",
            "avatars": "avatars",
            "notifications": "notifications",
            "logs": "logs"
        },
        "defaults": {
            "nickname": "emojis-bot",
            "prefix": "|",
            "emoji": null,
            "language": "eng",
            "doEmojis": false,
            "avatar": "https://cdn.discordapp.com/app-icons/883020186339397693/29bac6265dc018748578360634fe5c00.png"
        }
    },
    "localization": {
        "eng": {
            "notifications": {
                "header": "Lived",
                "units": {
                    "y": "years",
                    "m": "months",
                    "d": "days",
                    "h": "hours",
                    "min": "minutes"
                }
            },
            "messages": {
                "imgToAscII_error": "Error while processing an image UwU",
                "imgToAscII_no_files": "There are no files in your message ¯\\_(ツ)_/¯",
                "imgToAscII_wrong_file": "File not found",
                "imgToAscII_not_link": " - is not a link",
                "clear_error": "What error could possibly happen while deleting messages???",
                "help_author": "Some help:",
                "doEmojis_on": "Emojis enabled!:white_check_mark:",
                "doEmojis_off": "Emojist disabled!:negative_squared_cross_mark:",
                "doEmojis_args_warn": "State on or off",
                "doEmojis_access_warn": "This command is only avaliable for administrators :confused:",
                "doEmojis_db_error": "We have some troubles with data base",
                "setPrefix_success": "New prefix: ",
                "setPrefix_access_warn": "This command is only avaliable for administrators :confused:",
                "setPrefix_empty_warn": "Prefix can't be empty",
                "setPrefix_db_error": "We have some troubles with data base",
                "deleteEmoji_success": "Reaction deleted",
                "deleteEmoji_db_error": "We have some troubles with data base",
                "setEmoji_updated": "Reaction Updated",
                "setEmoji_error": "Wrong emoji >:(",
                "setEmoji_db_error": "We have some troubles with data base",
                "setEmoji_same_emoji": "You aleready have this emoji. May be emoji function turned off on this server?",
                "setLanguage_success": "Ok masta, my new language: ",
                "setLanguage_warn": "Bot isn't translated to this language (yet?)",
                "setLanguage_empty": "Empty language?",
                "setLanguage_db_error": "We have some troubles with data base",
                "subscribe_date_error": "Wrong date",
                "subscribe_duration_error": "Wrong life duration ^_^",
                "subscribe_send_success": "Subscribed",
                "subscribe_existing_user": "You are already subscribed. To change the data, unsubscribe and subscribe again.",
                "unsubscribe_not_subbed": "You wasn't subbed anyway",
                "unsubscribe_success": "Unsubscribed",
            },
            "commands": {
                "about": {
                    "setlang": "Set language [rus, eng]",
                    "setemoji": "Chose the message reaction",
                    "delemoji": "Remove the message reaction",
                    "doemojis": "Enable and disable bot reactions on the server (admins only)",
                    "setprefix": "Set prefix, I suppose",
                    "imgtoascii": "Convert an image to the text file",
                    "subscribe": "Counts how long are you going to live",
                    "unsubscribe": "Unsubscribe from daily notifications",
                    "addtrack": "Not for common users",
                    "clear": "Deletes bot messages from this channel",
                    "help": "Help"
                },
                "description": {
                    "setlang": "We'll have more languages in future",
                    "setemoji": "State emoji after command. You can use default emojis and emojis from servers with this bot",
                    "delemoji": "Delete reaction under your message",
                    "doemojis": "on - switch on, off - switch off",
                    "setprefix": "p.s. only for admins",
                    "imgtoascii": "Convert image to ascII text",
                    "subscribe": "I will every day notify you, how much days you have till the end",
                    "unsubscribe": "why? ¯\\_(ツ)_/¯",
                    "addtrack": "Adds track to database (special for maus999)",
                    "clear": "You can state amount of messages to delete",
                    "help": "Shows this message"
                }
            }
        },
        "rus": {
            "notifications": {
                "header": "Прожито",
                "units": {
                    "y": "лет",
                    "m": "месяцев",
                    "d": "дней",
                    "h": "часов",
                    "min": "минут",
                }
            },
            "messages": {
                "clear_error": "Какая ошибка могла случится во время удаления сообщений?",
                "imgToAscII_error": "Не удалось сохранить файл UwU",
                "imgToAscII_no_files": "В сообщении нет вложений ¯\\_(ツ)_/¯",
                "imgToAscII_wrong_file": "Файл не найден",
                "imgToAscII_not_link": " - не ссылка",
                "help_author": "Список команд:",
                "doEmojis_on": "Эмодзи включены!:white_check_mark:",
                "doEmojis_off": "Эмодзи выключены!:negative_squared_cross_mark:",
                "doEmojis_args_warn": "Передайте on или off",
                "doEmojis_access_warn": "Эта команда доступна только администраторам :confused:",
                "doEmojis_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
                "setPrefix_success": "Новый префикс: ",
                "setPrefix_access_warn": "Эта команда доступна только администраторам :confused:",
                "setPrefix_empty_warn": "Префикс не может быть пустым",
                "setPrefix_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
                "deleteEmoji_success": "Реакция удалена",
                "deleteEmoji_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
                "setEmoji_updated": "Reaction Updated",
                "setEmoji_error": "Это не эмодзи >:(",
                "setEmoji_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
                "setEmoji_same_emoji": "Эта реакция уже установлена. Может быть эмоджи выключены на этом сервере?",
                "setLanguage_success": "Ок, мой новый язык: ",
                "setLanguage_warn": "Бот ещё не переведён на этот язык :sob:",
                "setLanguage_empty": "Пустой язык?",
                "setLanguage_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
                "subscribe_date_error": "Неверная дата рождения",
                "subscribe_duration_error": "Неверная продолжительность жизни ^_^",
                "subscribe_send_success": "Подписка оформлена",
                "subscribe_existing_user": "Вы уже подписаны, для изменения данных отпишитесь и подпишитесь снова.",
                "unsubscribe_not_subbed": "Вы и так не подписаны",
                "unsubscribe_success": "Вы отписаны",
            },
            "commands": {
                "about": {
                    "setlang": "Устаноаить язык [rus, eng]",
                    "setemoji": "Выберите реакцию под сообщением",
                    "delemoji": "Убрать реакцию под сообщениями",
                    "doemojis": "Включить и выключить реакции от бота на сервере",
                    "setprefix": "Изменить префикс на сервере",
                    "imgtoascii": "Конвертировать картинку в текстовый файл",
                    "subscribe": "Считает сколько вам осталось",
                    "unsubscribe": "Отписаться от ежедневной рассылки",
                    "addtrack": "Команда не для среднестатистического пользователя",
                    "clear": "Удаляет сообщения бота из этого канала",
                    "help": "Помощь"
                },
                "description": {
                    "setlang": "В аргументе код языка, в будующем бот будет переводиться на большее количество языков.",
                    "setemoji": "Напишите команду и через пробел эмоджи для реакции под сообщением (если функция включена на сервере). Можно использовать дефолтные и эмоджи с серверов, на которых есть этот бот",
                    "delemoji": "Убрать реакцию под сообщениями",
                    "doemojis": "on - вкл. off - выкл.",
                    "setprefix": "Такое могут только админы",
                    "imgtoascii": "Конвертировать картинку в текстовый файл",
                    "subscribe": "Ежедневный счётчик, показывающий сколько вам осталось",
                    "unsubscribe": "Зачем? ¯\\_(ツ)_/¯",
                    "addtrack": "Добавить трек в базу данных (специально для maus999)",
                    "clear": "Можно указать количество сообщений, которое нужно удалить",
                    "help": "Показывает это сообщение"
                }
            }
        }
    }
};

export interface Config {
    administrator_permission: string;
    scan_limit: number;
    status: string;
    cron: Cron;
    events: Events;
    embed_colors: EmbedColors;
    ids: Ids;
    emojis: Emojis;
    img_to_ascii: ImgToAscii;
    database: Database;
    localization: Localization;
}

interface Cron {
    notifications: string;
    UI: string;
}

interface Commands {
    imgToAscII: string[];
    setEmoji: string[];
    deleteEmoji: string[];
    setLanguage: string[];
    setPrefix: string[];
    doEmojis: string[];
    subscribe: string[];
    unsubscribe: string[];
    clear: string[];
    help: string[];
}

interface Events {
    ready: string;
    message: string;
    guildCreate: string;
    guildDelete: string;
}

interface EmbedColors {
    error: ColorResolvable;
    success: ColorResolvable;
    discord: ColorResolvable;
}

interface Ids {
    avatars_channel: string;
    support_server: string;
}

interface Emojis {
    link: string;
    extension: string;
}

interface Options {
    fit: string;
    width: number;
    height: number;
    color: boolean;
}

interface ImgToAscii {
    options: Options;
    file_name: string;
}

interface Collections {
    users: string;
    servers: string;
    avatars: string;
    notifications: string;
    logs: string;
}

interface Defaults {
    nickname: string;
    prefix: string;
    emoji: null;
    language: "rus" | "eng";
    doEmojis: boolean;
    avatar: string;
}

interface Database {
    collections: Collections;
    defaults: Defaults;
}

interface Units {
    y: string;
    m: string;
    d: string;
    h: string;
    min: string;
}

interface Notifications {
    header: string;
    units: Units;
}

interface Lang {
    notifications: Notifications;
    messages: Messages;
    commands: {
        about: About;
        description: Description;
    }
}

interface Localization {
    eng: Lang;
    rus: Lang;
}

interface Messages {
    imgToAscII_error: string;
    imgToAscII_no_files: string;
    imgToAscII_wrong_file: string;
    imgToAscII_not_link: string;
    clear_error: string;
    help_author: string;
    doEmojis_on: string;
    doEmojis_off: string;
    doEmojis_args_warn: string;
    doEmojis_access_warn: string;
    doEmojis_db_error: string;
    setPrefix_success: string;
    setPrefix_access_warn: string;
    setPrefix_empty_warn: string;
    setPrefix_db_error: string;
    deleteEmoji_success: string;
    deleteEmoji_db_error: string;
    setEmoji_updated: string;
    setEmoji_error: string;
    setEmoji_db_error: string;
    setEmoji_same_emoji: string;
    setLanguage_success: string;
    setLanguage_warn: string;
    setLanguage_empty: string;
    setLanguage_db_error: string;
    subscribe_date_error: string;
    subscribe_duration_error: string;
    subscribe_send_success: string;
    subscribe_existing_user: string;
    unsubscribe_not_subbed: string;
    unsubscribe_success: string;
}

interface About {
    setlang: string;
    setemoji: string;
    delemoji: string;
    doemojis: string;
    setprefix: string;
    imgtoascii: string;
    subscribe: string;
    unsubscribe: string;
    addtrack: string;
    clear: string;
    help: string;
}

interface Description {
    setlang: string;
    setemoji: string;
    delemoji: string;
    doemojis: string;
    setprefix: string;
    imgtoascii: string;
    subscribe: string;
    unsubscribe: string;
    addtrack: string;
    clear: string;
    help: string;
}