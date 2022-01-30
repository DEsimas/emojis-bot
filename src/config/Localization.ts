import { Categories, CommandLocalization, CommandName, Language } from "./Types";

export const commandsLocalization: Record<Language, CommandLocalization> = {
    "eng": {
        "Clear": {
            "error": "What error could possibly happen while deleting messages???"
        },
        "DeleteEmoji": {
            "success": "Reaction deleted",
            "db_error": "We have some troubles with data base"
        },
        "DoEmojis": {
            "on": "Emojis enabled!:white_check_mark:",
            "off": "Emojist disabled!:negative_squared_cross_mark:",
            "args_warn": "State on or off",
            "access_warn": "This command is only avaliable for administrators :confused:",
            "db_error": "We have some troubles with data base"
        },
        "Help": {
            "commands_header": "Some help:",
            "categories_header": "Categories:",
            "categories_guide": "Provide a category name to see specific commands"
        },
        "ImgToAscII": {
            "error": "Error while processing an image UwU",
            "no_files": "There are no files in your message ¯\\_(ツ)_/¯",
            "wrong_file": "Error while processing a file",
            "not_link": " - is not a link"
        },
        "GetAvatar": {
            "error": "Произощла ошибка, повторите позже"
        },
        "SetEmoji": {
            "updated": "Reaction Updated",
            "error": "Wrong emoji >:(",
            "db_error": "We have some troubles with data base",
            "same_emoji": "You aleready have this emoji. May be emoji function turned off on this server?"
        },
        "SetLanguage": {
            "success": "Ok masta, my new language: ",
            "warn": "Bot isn't translated to this language (yet?)",
            "empty": "Empty language?",
            "db_error": "We have some troubles with data base"
        },
        "SetPrefix": {
            "success": "New prefix: ",
            "access_warn": "This command is only avaliable for administrators :confused:",
            "empty_warn": "Prefix can't be empty",
            "db_error": "We have some troubles with data base",
        },
        "Subscribe": {
            "date_error": "Wrong date",
            "duration_error": "Wrong life duration ^_^",
            "send_success": "Subscribed",
            "send_error": "Something went wrong. Try again later",
            "existing_user": "You are already subscribed. To change the data, unsubscribe and subscribe again."
        },
        "Unsubscribe": {
            "not_subbed": "You wasn't subbed anyway",
            "success": "Unsubscribed"
        },
        "Poll": {
            "default_message": "Poll!",
            "bad_time_error": "Poll time should be fewer than 6 hours, you can leave poll without timeout to make it infinite"
        },
        "DoGreetings": {
            "wrong_input": "State on or off",
            "on": "Greetings enabled (￣^￣)ゞ",
            "off": "Functions disabled",
            "access_error": "This command is only for admins",
        }
    },
    "rus": {
        "Clear": {
            "error": "Какая ошибка могла случится во время удаления сообщений?"
        },
        "DeleteEmoji": {
            "success": "Реакция удалена",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "DoEmojis": {
            "on": "Эмодзи включены!:white_check_mark:",
            "off": "Эмодзи выключены!:negative_squared_cross_mark:",
            "args_warn": "Передайте on или off",
            "access_warn": "Эта команда доступна только администраторам :confused:",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "Help": {
            "commands_header": "Список команд:",
            "categories_header": "Категории:",
            "categories_guide": "Укажите название категории для получения помощи по конкретным командам"
        },
        "ImgToAscII": {
            "error": "Не удалось сохранить файл UwU",
            "no_files": "В сообщении нет вложений ¯\\_(ツ)_/¯",
            "wrong_file": "Ошибка во время обработки файла",
            "not_link": " - не ссылка"
        },
        "GetAvatar": {
            "error": "Failed to load avatar"
        },
        "SetEmoji": {
            "updated": "Reaction Updated",
            "error": "Это не эмодзи >:(",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "same_emoji": "Эта реакция уже установлена. Может быть эмоджи выключены на этом сервере?"
        },
        "SetLanguage": {
            "success": "Ок, мой новый язык: ",
            "warn": "Бот ещё не переведён на этот язык :sob:",
            "empty": "Пустой язык?",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова"
        },
        "SetPrefix": {
            "success": "Новый префикс: ",
            "access_warn": "Эта команда доступна только администраторам :confused:",
            "empty_warn": "Префикс не может быть пустым",
            "db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
        },
        "Subscribe": {
            "date_error": "Неверная дата рождения",
            "duration_error": "Неверная продолжительность жизни ^_^",
            "send_success": "Подписка оформлена",
            "send_error": "Произошла ошибка, попробуйте позже",
            "existing_user": "Вы уже подписаны, для изменения данных отпишитесь и подпишитесь снова."
        },
        "Unsubscribe": {
            "not_subbed": "Вы и так не подписаны",
            "success": "Вы отписаны"
        },
        "Poll": {
            "default_message": "Опрос!",
            "bad_time_error": "Длительность опроса должна быть меньше 6 часов. Для создания бесконечного опроса не нужно указывать время."
        },
        "DoGreetings": {
            "wrong_input": "Передайте on или off",
            "on": "Приветствие вклчено (￣^￣)ゞ",
            "off": "Функция отключена",
            "access_error": "Эта команда только для администраторов",
        }
    }
};

export const help: Record<Language, { about: Record<CommandName, string>, description: Record<CommandName, string>, categories: Record<Categories, string> }> = {
    "eng": {
        "about": {
            "SetLanguage": "Set language [rus, eng]",
            "SetEmoji": "Chose the message reaction",
            "DeleteEmoji": "Remove the message reaction",
            "DoEmojis": "Enable and disable bot reactions on the server (admins only)",
            "DoGreetings": "Enable greetings in system channel",
            "SetPrefix": "Set prefix, I suppose",
            "ImgToAscII": "Convert an image to the text file",
            "GetAvatar": "Watch someones avatar clearly",
            "Subscribe": "Counts how long lived",
            "Unsubscribe": "Unsubscribe from daily notifications",
            "Poll": "Creates poll message",
            "Clear": "Deletes bot messages from this channel",
            "Help": "Help"
        },
        "description": {
            "SetLanguage": "We'll have more languages in future",
            "SetEmoji": "State emoji after command. You can use default emojis and emojis from servers with this bot",
            "DeleteEmoji": "Delete reaction under your message",
            "DoEmojis": "on - switch on, off - switch off",
            "DoGreetings": "state \"on\" or \"off\"",
            "SetPrefix": "p.s. only for admins",
            "ImgToAscII": "Convert image to ascII text",
            "GetAvatar": "Ping user, like GetAvatar @maus999",
            "Subscribe": "Use date in american format",
            "Unsubscribe": "why? ¯\\_(ツ)_/¯",
            "Poll": "You can add timeout using *h, *m, *s attributes",
            "Clear": "You can state amount of messages to delete",
            "Help": "Shows this message"
        },
        "categories": {
            "admin": "Commands that can be used only by admins",
            "emojis": "Everything related to the emojis functional",
            "interaction": "Interaction with bot",
            "notifications": "Setting up daily notifications",
            "special": "Spacial commands ( ͡° ͜ʖ ͡°)",
            "user": "Customizing bot"
        }
    },
    "rus": {
        "about": {
            "SetLanguage": "Устаноаить язык [rus, eng]",
            "SetEmoji": "Выберите реакцию под сообщением",
            "DeleteEmoji": "Убрать реакцию под сообщениями",
            "DoEmojis": "Включить и выключить реакции от бота на сервере",
            "DoGreetings": "Включить/выфключить приветствие новых пользователей",
            "SetPrefix": "Изменить префикс на сервере",
            "ImgToAscII": "Конвертировать картинку в текстовый файл",
            "GetAvatar": "Позволяет рассмотреть чью-то аватарку",
            "Subscribe": "Считает сколько вы прожили",
            "Unsubscribe": "Отписаться от ежедневной рассылки",
            "Poll": "Отправить сообщение с опросом",
            "Clear": "Удаляет сообщения бота из этого канала",
            "Help": "Помощь"
        },
        "description": {
            "SetLanguage": "В аргументе код языка, в будующем бот будет переводиться на большее количество языков.",
            "SetEmoji": "Напишите команду и через пробел эмоджи для реакции под сообщением (если функция включена на сервере). Можно использовать дефолтные и эмоджи с серверов, на которых есть этот бот",
            "DeleteEmoji": "Убрать реакцию под сообщениями",
            "DoEmojis": "on - вкл. off - выкл.",
            "DoGreetings": "on - вкл. off - выкл.",
            "SetPrefix": "Такое могут только админы",
            "ImgToAscII": "Конвертировать картинку в текстовый файл",
            "GetAvatar": "Укажите пользователя в следующем формате: getavatar @maus999",
            "Subscribe": "Дату рождения следует вводить в американском формате",
            "Unsubscribe": "Зачем? ¯\\_(ツ)_/¯",
            "Poll": "используйте *h, *m, *s для задания времени опроса",
            "Clear": "Можно указать количество сообщений, которое нужно удалить",
            "Help": "Показывает это сообщение"
        },
        "categories": {
            "admin": "Команды, предназначенные только для администраторов",
            "emojis": "Всё, что связано с реакциями под сообщениями",
            "interaction": "Взаимодействие с ботом",
            "notifications": "Функционал, связанный с ежедневными уведомлениями",
            "special": "Специальные ( ͡° ͜ʖ ͡°)",
            "user": "Настройки бота для каждого пользователя"
        }
    }
}

export const guildMembers: Record<string, string> = {
    "welcome": " hopped on this server!",
    "bye": "Goodbye, "
}

export const notifications: Record<Language, Record<string, string>> = {
    "eng": {
        "header": "Lived",
        "y": "years",
        "m": "months",
        "d": "days",
        "h": "hours",
        "min": "minutes"
    },
    "rus": {
        "header": "Прожито",
        "y": "лет",
        "m": "месяцев",
        "d": "дней",
        "h": "часов",
        "min": "минут"
    }
}

export const stateExamCounter: Record<Language, Record<string, string>> = {
    "eng": {
        "header": "Until the exam left:",
        "unit": "days",
        "math": "Profile mathematics",
        "russian": "Russian language",
        "physics": "Physics",
        "informatics": "Informatics",
        "chemistry": "Chemistry"
    },
    "rus": {
        "header": "До егэ осталось:",
        "unit": "дней",
        "math": "Математика профиль",
        "russian": "Русский язык",
        "physics": "Физика",
        "informatics": "Информатика",
        "chemistry": "Химия"
    }
}