import { ColorResolvable } from "discord.js";

export const config: Config = {
    "administrator_permission": "ADMINISTRATOR",
    "scan_limit": 100,
    "cron": {
        "notifications": "0 0 * * *"
    },
    "commands": {
        "imgToAscII": ["imgtoascii", "ita"],
        "setEmoji": ["setemoji"],
        "deleteEmoji": ["delemoji"],
        "setLanguage": ["setlang", "lang", "setlanguage"],
        "setPrefix": ["setprefix"],
        "doEmojis": ["doemojis"],
        "subscribe": ["subscribe", "sub"],
        "unsubscribe": ["unsubscribe", "unsub"],
        "clear": ["clear", "cls"],
        "help": ["help", "h"]
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
            "notifications": "notifications"
        },
        "defaults": {
            "nickname": "emojis-bot",
            "prefix": "|",
            "emoji": null,
            "language": "eng",
            "doEmojis": false
        }
    },
    "status": ["on ", " servers with ", " users"],
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
            "msg_imgToAscII_error": "Error while processing an image UwU",
            "msg_imgToAscII_no_files": "There are no files in your message ¯\\_(ツ)_/¯",
            "msg_imgToAscII_wrong_file": "File not found",
            "msg_imgToAscII_not_link": " - is not a link",
            "msg_clear_error": "What error could possibly happen while deleting messages???",
            "emd_help_author": "Some help:",
            "msg_doEmojis_on": "Emojis enabled!:white_check_mark:",
            "msg_doEmojis_off": "Emojist disabled!:negative_squared_cross_mark:",
            "msg_doEmojis_args_warn": "State on or off",
            "msg_doEmojis_access_warn": "This command is only avaliable for administrators :confused:",
            "msg_doEmojis_db_error": "We have some troubles with data base",
            "msg_setPrefix_success": "New prefix: ",
            "msg_setPrefix_access_warn": "This command is only avaliable for administrators :confused:",
            "msg_setPrefix_empty_warn": "Prefix can't be empty",
            "msg_setPrefix_db_error": "We have some troubles with data base",
            "msg_deleteEmoji_success": "Reaction deleted",
            "msg_deleteEmoji_db_error": "We have some troubles with data base",
            "msg_setEmoji_updated": "Reaction Updated",
            "msg_setEmoji_error": "Wrong emoji >:(",
            "msg_setEmoji_db_error": "We have some troubles with data base",
            "msg_setEmoji_same_emoji": "You aleready have this emoji. May be emoji function turned off on this server?",
            "msg_setLanguage_success": "Ok masta, my new language: ",
            "msg_setLanguage_warn": "Bot isn't translated to this language (yet?)",
            "msg_setLanguage_empty": "Empty language?",
            "msg_setLanguage_db_error": "We have some troubles with data base",
            "msg_subscribe_date_error": "Wrong date",
            "msg_subscribe_duration_error": "Wrong life duration ^_^",
            "msg_subscribe_send_success": "Subscribed",
            "msg_subscribe_existing_user": "You are already subscribed. To change the data, unsubscribe and subscribe again.",
            "msg_unsubscribe_not_subbed": "You wasn't subbed anyway",
            "msg_unsubscribe_success": "Unsubscribed",
            "abt_setlang": "Set language [rus, eng]",
            "abt_setemoji": "Chose the message reaction",
            "abt_delemoji": "Remove the message reaction",
            "abt_doemojis": "Enable and disable bot reactions on the server (admins only)",
            "abt_setprefix": "Set prefix, I suppose",
            "abt_imgtoascii": "Convert an image to the text file",
            "abt_subscribe": "Counts how long are you going to live",
            "abt_unsubscribe": "Unsubscribe from daily notifications",
            "abt_addtrack": "Not for common users",
            "abt_clear": "Deletes bot messages from this channel",
            "abt_help": "Help",
            "dsc_setlang": "We'll have more languages in future",
            "dsc_setemoji": "State emoji after command. You can use default emojis and emojis from servers with this bot",
            "dsc_delemoji": "Delete reaction under your message",
            "dsc_doemojis": "on - switch on, off - switch off",
            "dsc_setprefix": "p.s. only for admins",
            "dsc_imgtoascii": "Convert image to ascII text",
            "dsc_subscribe": "I will every day notify you, how much days you have till the end",
            "dsc_unsubscribe": "why? ¯\\_(ツ)_/¯",
            "dsc_addtrack": "Adds track to database (special for maus999)",
            "dsc_clear": "You can state amount of messages to delete",
            "dsc_help": "Shows this message"
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
            "msg_clear_error": "Какая ошибка могла случится во время удаления сообщений?",
            "msg_imgToAscII_error": "Не удалось сохранить файл UwU",
            "msg_imgToAscII_no_files": "В сообщении нет вложений ¯\\_(ツ)_/¯",
            "msg_imgToAscII_wrong_file": "Файл не найден",
            "msg_imgToAscII_not_link": " - не ссылка",
            "emd_help_author": "Список команд:",
            "msg_doEmojis_on": "Эмодзи включены!:white_check_mark:",
            "msg_doEmojis_off": "Эмодзи выключены!:negative_squared_cross_mark:",
            "msg_doEmojis_args_warn": "Передайте on или off",
            "msg_doEmojis_access_warn": "Эта команда доступна только администраторам :confused:",
            "msg_doEmojis_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_setPrefix_success": "Новый префикс: ",
            "msg_setPrefix_access_warn": "Эта команда доступна только администраторам :confused:",
            "msg_setPrefix_empty_warn": "Префикс не может быть пустым",
            "msg_setPrefix_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_deleteEmoji_success": "Реакция удалена",
            "msg_deleteEmoji_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_setEmoji_updated": "Reaction Updated",
            "msg_setEmoji_error": "Это не эмодзи >:(",
            "msg_setEmoji_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_setEmoji_same_emoji": "Эта реакция уже установлена. Может быть эмоджи выключены на этом сервере?",
            "msg_setLanguage_success": "Ок, мой новый язык: ",
            "msg_setLanguage_warn": "Бот ещё не переведён на этот язык :sob:",
            "msg_setLanguage_empty": "Пустой язык?",
            "msg_setLanguage_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_subscribe_date_error": "Неверная дата рождения",
            "msg_subscribe_duration_error": "Неверная продолжительность жизни ^_^",
            "msg_subscribe_send_success": "Подписка оформлена",
            "msg_subscribe_existing_user": "Вы уже подписаны, для изменения данных отпишитесь и подпишитесь снова.",
            "msg_unsubscribe_not_subbed": "Вы и так не подписаны",
            "msg_unsubscribe_success": "Вы отписаны",
            "abt_setlang": "Устаноаить язык [rus, eng]",
            "abt_setemoji": "Выберите реакцию под сообщением",
            "abt_delemoji": "Убрать реакцию под сообщениями",
            "abt_doemojis": "Включить и выключить реакции от бота на сервере",
            "abt_setprefix": "Изменить префикс на сервере",
            "abt_imgtoascii": "Конвертировать картинку в текстовый файл",
            "abt_subscribe": "Считает сколько вам осталось",
            "abt_unsubscribe": "Отписаться от ежедневной рассылки",
            "abt_addtrack": "Команда не для среднестатистического пользователя",
            "abt_clear": "Удаляет сообщения бота из этого канала",
            "abt_help": "Помощь",
            "dsc_setlang": "В аргументе код языка, в будующем бот будет переводиться на большее количество языков.",
            "dsc_setemoji": "Напишите команду и через пробел эмоджи для реакции под сообщением (если функция включена на сервере). Можно использовать дефолтные и эмоджи с серверов, на которых есть этот бот",
            "dsc_delemoji": "Убрать реакцию под сообщениями",
            "dsc_doemojis": "on - вкл. off - выкл.",
            "dsc_setprefix": "Такое могут только админы",
            "dsc_imgtoascii": "Конвертировать картинку в текстовый файл",
            "dsc_subscribe": "Ежедневный счётчик, показывающий сколько вам осталось",
            "dsc_unsubscribe": "Зачем? ¯\\_(ツ)_/¯",
            "dsc_addtrack": "Добавить трек в базу данных (специально для maus999)",
            "dsc_clear": "Можно указать количество сообщений, которое нужно удалить",
            "dsc_help": "Показывает это сообщение"
        }
    }
};

export interface Config {
    administrator_permission: string;
    scan_limit: number;
    cron: Cron;
    commands: Commands;
    events: Events;
    embed_colors: EmbedColors;
    ids: Ids;
    emojis: Emojis;
    img_to_ascii: ImgToAscii;
    database: Database;
    status: string[];
    localization: Localization;
}

interface Cron {
    notifications: string;
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
}

interface Defaults {
    nickname: string;
    prefix: string;
    emoji: null;
    language: "rus" | "eng";
    doEmojis: boolean;
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
    msg_imgToAscII_error: string;
    msg_imgToAscII_no_files: string;
    msg_imgToAscII_wrong_file: string;
    msg_imgToAscII_not_link: string;
    msg_clear_error: string;
    emd_help_author: string;
    msg_doEmojis_on: string;
    msg_doEmojis_off: string;
    msg_doEmojis_args_warn: string;
    msg_doEmojis_access_warn: string;
    msg_doEmojis_db_error: string;
    msg_setPrefix_success: string;
    msg_setPrefix_access_warn: string;
    msg_setPrefix_empty_warn: string;
    msg_setPrefix_db_error: string;
    msg_deleteEmoji_success: string;
    msg_deleteEmoji_db_error: string;
    msg_setEmoji_updated: string;
    msg_setEmoji_error: string;
    msg_setEmoji_db_error: string;
    msg_setEmoji_same_emoji: string;
    msg_setLanguage_success: string;
    msg_setLanguage_warn: string;
    msg_setLanguage_empty: string;
    msg_setLanguage_db_error: string;
    msg_subscribe_date_error: string;
    msg_subscribe_duration_error: string;
    msg_subscribe_send_success: string;
    msg_subscribe_existing_user: string;
    msg_unsubscribe_not_subbed: string;
    msg_unsubscribe_success: string;
    abt_setlang: string;
    abt_setemoji: string;
    abt_delemoji: string;
    abt_doemojis: string;
    abt_setprefix: string;
    abt_imgtoascii: string;
    abt_subscribe: string;
    abt_unsubscribe: string;
    abt_addtrack: string;
    abt_clear: string;
    abt_help: string;
    dsc_setlang: string;
    dsc_setemoji: string;
    dsc_delemoji: string;
    dsc_doemojis: string;
    dsc_setprefix: string;
    dsc_imgtoascii: string;
    dsc_subscribe: string;
    dsc_unsubscribe: string;
    dsc_addtrack: string;
    dsc_clear: string;
    dsc_help: string;
}

interface Localization {
    eng: Lang;
    rus: Lang;
}