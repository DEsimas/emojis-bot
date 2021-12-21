import { ILocalization } from './Localization.d';

export const Localization: Record<string, ILocalization> = {
    "eng": {
        "notifications": {
            "header": "Lived",
            "y": "years",
            "m": "months",
            "d": "days",
            "h": "hours",
            "min": "minutes"
        },
        "clear": {
            "error": "What error could possibly happen while deleting messages???"
        },
        "deleteEmoji": {
            "success": "Reaction deleted",
            "db_error": "We have some troubles with data base"
        },
        "doEmojis": {
            "on": "Emojis enabled!:white_check_mark:",
            "off": "Emojist disabled!:negative_squared_cross_mark:",
            "args_warn": "State on or off",
            "access_warn": "This command is only avaliable for administrators :confused:",
            "db_error": "We have some troubles with data base"
        },
        "help": {
            "author": "Some help:",
            "about": {
                "SetLanguage": "Set language [rus, eng]",
                "SetEmoji": "Chose the message reaction",
                "DeleteEmoji": "Remove the message reaction",
                "DoEmojis": "Enable and disable bot reactions on the server (admins only)",
                "SetPrefix": "Set prefix, I suppose",
                "ImgToAscII": "Convert an image to the text file",
                "Subscribe": "Counts how long are you going to live",
                "Unsubscribe": "Unsubscribe from daily notifications",
                "Clear": "Deletes bot messages from this channel",
                "Help": "Help"
            },
            "description": {
                "SetLanguage": "We'll have more languages in future",
                "SetEmoji": "State emoji after command. You can use default emojis and emojis from servers with this bot",
                "DeleteEmoji": "Delete reaction under your message",
                "DoEmojis": "on - switch on, off - switch off",
                "SetPrefix": "p.s. only for admins",
                "ImgToAscII": "Convert image to ascII text",
                "Subscribe": "I will every day notify you, how much days you have till the end",
                "Unsubscribe": "why? ¯\\_(ツ)_/¯",
                "addtrack": "Adds track to database (special for maus999)",
                "Clear": "You can state amount of messages to delete",
                "Help": "Shows this message"
            }
        },
        "imgToAscII": {
            "error": "Error while processing an image UwU",
            "no_files": "There are no files in your message ¯\\_(ツ)_/¯",
            "wrong_file": "File not found",
            "not_link": " - is not a link"
        },
        "setEmoji": {
            "updated": "Reaction Updated",
            "error": "Wrong emoji >:(",
            "db_error": "We have some troubles with data base",
            "same_emoji": "You aleready have this emoji. May be emoji function turned off on this server?"
        },
        "setLanguage": {
            "success": "Ok masta, my new language: ",
            "warn": "Bot isn't translated to this language (yet?)",
            "empty": "Empty language?",
            "db_error": "We have some troubles with data base"
        },
        "setPrefix": {
            "success": "New prefix: ",
            "access_warn": "This command is only avaliable for administrators :confused:",
            "empty_warn": "Prefix can't be empty",
            "db_error": "We have some troubles with data base"
        },
        "subscribe": {
            "date_error": "Wrong date",
            "duration_error": "Wrong life duration ^_^",
            "send_success": "Subscribed",
            "existing_user": "You are already subscribed. To change the data, unsubscribe and subscribe again."
        },
        "unsubscribe": {
            "not_subbed": "You wasn't subbed anyway",
            "success": "Unsubscribed"
        }
    },
    "rus": {
        "notifications": {
            "header": "Прожито",
            "y": "лет",
            "m": "месяцев",
            "d": "дней",
            "h": "часов",
            "min": "минут",
        },
        "clear": {
            "error": "Какая ошибка могла случится во время удаления сообщений?"
        },
        "deleteEmoji": {
            "success": "Реакция удалена",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "doEmojis": {
            "on": "Эмодзи включены!:white_check_mark:",
            "off": "Эмодзи выключены!:negative_squared_cross_mark:",
            "args_warn": "Передайте on или off",
            "access_warn": "Эта команда доступна только администраторам :confused:",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "help": {
            "author": "Список команд:",
            "about": {
                "SetLanguage": "Устаноаить язык [rus, eng]",
                "SetEmoji": "Выберите реакцию под сообщением",
                "DeleteEmoji": "Убрать реакцию под сообщениями",
                "DoEmojis": "Включить и выключить реакции от бота на сервере",
                "SetPrefix": "Изменить префикс на сервере",
                "ImgToAscII": "Конвертировать картинку в текстовый файл",
                "Subscribe": "Считает сколько вам осталось",
                "Unsubscribe": "Отписаться от ежедневной рассылки",
                "Clear": "Удаляет сообщения бота из этого канала",
                "Help": "Помощь"
            },
            "description": {
                "SetLanguage": "В аргументе код языка, в будующем бот будет переводиться на большее количество языков.",
                "SetEmoji": "Напишите команду и через пробел эмоджи для реакции под сообщением (если функция включена на сервере). Можно использовать дефолтные и эмоджи с серверов, на которых есть этот бот",
                "DeleteEmoji": "Убрать реакцию под сообщениями",
                "DoEmojis": "on - вкл. off - выкл.",
                "SetPrefix": "Такое могут только админы",
                "ImgToAscII": "Конвертировать картинку в текстовый файл",
                "Subscribe": "Ежедневный счётчик, показывающий сколько вам осталось",
                "Unsubscribe": "Зачем? ¯\\_(ツ)_/¯",
                "addtrack": "Добавить трек в базу данных (специально для maus999)",
                "Clear": "Можно указать количество сообщений, которое нужно удалить",
                "Help": "Показывает это сообщение"
            }
        },
        "imgToAscII": {
            "error": "Не удалось сохранить файл UwU",
            "no_files": "В сообщении нет вложений ¯\\_(ツ)_/¯",
            "wrong_file": "Файл не найден",
            "not_link": " - не ссылка"
        },
        "setEmoji": {
            "updated": "Reaction Updated",
            "error": "Это не эмодзи >:(",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "same_emoji": "Эта реакция уже установлена. Может быть эмоджи выключены на этом сервере?"
        },
        "setLanguage": {
            "success": "Ок, мой новый язык: ",
            "warn": "Бот ещё не переведён на этот язык :sob:",
            "empty": "Пустой язык?",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "setPrefix": {
            "success": "Новый префикс: ",
            "access_warn": "Эта команда доступна только администраторам :confused:",
            "empty_warn": "Префикс не может быть пустым",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "subscribe": {
            "date_error": "Неверная дата рождения",
            "duration_error": "Неверная продолжительность жизни ^_^",
            "send_success": "Подписка оформлена",
            "existing_user": "Вы уже подписаны, для изменения данных отпишитесь и подпишитесь снова."
        },
        "unsubscribe": {
            "not_subbed": "Вы и так не подписаны",
            "success": "Вы отписаны"
        }
    }
};