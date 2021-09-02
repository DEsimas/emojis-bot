export default {
    "token": "ODgzMDIwMTg2MzM5Mzk3Njkz.YTD2og.tHVNAvNyGYC_WrwrTdAJgoOhHek", //for production
    // "token": "ODgzMDUxNTkwOTU5ODk0NTM4.YTET4Q.y8VCuDJfdeyCXz9obxO_CuQNd8s", //for development
    "error_color": "#ff0000",
    "success_color": "#00ff00",
    "embed_color": "#ffffff",
    "default_prefix": "|",
    "default_doEmojis": false,
    "default_emoji": null,
    "default_language": "eng",
    "commands": {
        // "setLanguage": ["setlang", "lang"],
        // "setEmoji": ["setemoji"],
        // "deleteEmoji": ["delemoji"],
        // "doEmojis": ["doemojis"],
        // "setPrefix": ["setprefix"],
        "getHentai": ["gethentai", "nhentai"],
        // "imgToAscII": ["imgtoascii", "ita"],
        // "clear": ["clear", "cls"],
        // "help": ["help"]
    },
    "events": {
        "ready": "ready",
        "message": "message",
        "guildCreate": "guildCreate",
        "guildDelete": "guildDelete"
    },
    "log": {
        "ready": "bot started",
        "db": "database connected",
        "db_error": "database error: "
    },
    "db_settings": {
        "url": "mongodb+srv://administrator:E0yV1T8lCJ62QXMc@cluster0.hmvjj.mongodb.net/discord_bot?retryWrites=true&w=majority",
        "db_collections": {
            "users": "users",
            "servers": "servers"
        },
        "default_values": [
            {
                "userID": "872099701762170932",
                "emojiID": "822395665660379186",
                "language": "eng"
            },
            {
                "userID": "252128902418268161",
                "emojiID": "822845799738245130",
                "language": "eng"
            },
            {
                "userID": "159985870458322944",
                "emojiID": "872923821701726230",
                "language": "eng"
            },
            {
                "userID": "883020186339397693",
                "emojiID": "872904187921440788",
                "language": "eng"
            }
        ],
        "log": {
            "db": "database connected",
            "db_error": "database error: "
        }
    },
    "localization": {
        "eng": {
            "msg_getHentai_nhentai": "NHENTAI",
            "msg_getHentai_intro": "Enjoy the masterpiece:",
            "msg_getHentai_tags": "Tags:",
            "msg_getHentai_id_warn": "Wrong ID",
			"msg_getHentai_nsfw_warn": "Hentai is avaliable only at nsfw channels :sob:",
            "msg_getHentai_fetch_error": "An error was occurred. May be its a sign?",
            "msg_imgToAscII_error": "Error while processing an image UwU",
            "msg_imgToAscII_no_files": "There are no files in your message ¯\\_(ツ)_/¯",
            "msg_clear_error": "What error could possibly happen while deleting messages???",
            "emd_help_author": "Some help:",
            "msg_addMeme_access_denied": "You don't have access to this command ¯\\_(ツ)_/¯",
            "msg_addMeme_empty_message": "Epic embed fail(╥ω╥)",
            "msg_addMeme_file_saved": "saved",
            "msg_addMeme_file_error": "Failed to save file UwU",
            "msg_deleteMeme_success": "deleted",
            "msg_deleteMeme_access_denied": "You don't have access to this command ¯\\_(ツ)_/¯",
            "msg_deleteMeme_channel_error": "Use channel with memes",
            "msg_deleteMeme_cache_error": "Forgot what meme I sent last time ¯\\_(ツ)_/¯",
			"msg_startMemes_success": "Less go (￣^￣)ゞ",
            "msg_startMemes_aleready_started": "I'm aleready sending memes >_<",
            "msg_startMemes_speed_error": "Woah there buddy",
			"msg_startMemes_no_channel_warn": "For using this function this server has to have channel for bot memes",
            "msg_startMemes_file_error": "Error while sending the meme",
			"msg_startMemes_no_memes": "OMG no memes in database :scream:",
            "msg_stopMemes_success": ":(",
            "msg_stopMemes_empty_interval": "Nothing to stop",
			"msg_doEmojis_on": "Emojis enabled!:white_check_mark:",
			"msg_doEmojis_off": "Emojist disabled!:negative_squared_cross_mark:",
            "msg_doEmojis_args_warn": "State on or off",
			"msg_doEmojis_access_warn": "This command is only avaliable for administrators :confused:",
            "msg_doEmojis_db_error": "We have some troubles with data base",
            "msg_setMemesChannel_success": "New memes channel: ",
            "msg_setMemesChannel_argument_warn": "No arguments in your message",
            "msg_setMemesChannel_permission_warn": "This command is only avaliable for administrators :confused:",
			"msg_setPrefix_success": "New prefix: ",
			"msg_setPrefix_access_warn": "This command is only avaliable for administrators :confused:",
            "msg_setPrefix_empty_warn": "Prefix can't be empty",
            "msg_setPrefix_db_error": "We have some troubles with data base",
            "msg_deleteEmoji_success": "Reaction deleted",
            "msg_deleteEmoji_db_error": "We have some troubles with data base",
            "msg_setEmoji_updated": "Reaction Updated",
            "msg_setEmoji_error": "Wrong emoji >:(",
            "msg_setEmoji_db_error": "We have some troubles with data base",
			"msg_setLanguage_success": "Ok masta, my new language: ",
            "msg_setLanguage_warn": "Bot isn't translated to this language (yet?)",
            "msg_setLanguage_empty": "Empty language?",
            "msg_setLanguage_db_error": "We have some troubles with data base",
			"abt_startmemes": "Regularly sends memes",
			"abt_stopmemes": "Stop sending memes ~~in general~~",
			"abt_setlang": "Set language [rus, eng]",
			"abt_setemoji": "Chose the message reaction",
			"abt_delemoji": "Remove the message reaction",
			"abt_doemojis": "Enable and disable bot reactions on the server (admins only)",
			"abt_setprefix": "Set prefix, I suppose",
            "abt_setmemeschannel": "Set the channel that everyone will mute",
			"abt_addmeme": "Add memes in collection (limited access)",
			"abt_delmeme": "Delete meme from collection (limited access)",
			"abt_gethentai": "Wanna read hentai in any(nsfw) channel? No problem (^_~)",
			"abt_imgtoascii": "Convert an image to the text file",
            "abt_clear": "Deletes bot messages from this channel",
			"abt_help": "Help",
            "dsc_startmemes": "Шлёт дерьмовые мемы в специальный канал для мемов (стандартный bot-memes). Частоту в секундах можно передать в аргументе (стандартная 600 секунд).",
			"dsc_stopmemes": "Прекраить отправлять мемы",
			"dsc_setlang": "В аргументе код языка, в будующем бот будет переводиться на большее количество языков.",
			"dsc_setemoji": "Напишите команду и через пробел эмоджи для реакции под сообщением (если функция включена на сервере). Можно использовать дефолтные и эмоджи с серверов, на которых есть этот бот",
			"dsc_delemoji": "Убрать реакцию под сообщениями",
			"dsc_doemojis": "on - вкл. off - выкл.",
			"dsc_setprefix": "Такое могут только админы",
            "dsc_setmemeschannel": "Такое могут только админы",
			"dsc_addmeme": "Естественно только для создатля бота. Никому не дам качать что-то на мой комп",
			"dsc_delmeme": "Естественно только для создатля бота. Никому не дам удалять что-то -_-",
			"dsc_gethentai": "Найти мангу с nhentai по коду. Работает не всегда, т.к. нужет vpn",
			"dsc_imgtoascii": "Конвертировать картинку в текстовый файл",
            "dsc_clear": "Можно указать количество сообщений, которое нужно удалить",
			"dsc_help": "Показывает это сообщение"
        },
        "rus": {
            "msg_getHentai_nhentai": "NHENTAI",
            "msg_getHentai_intro": "Наслаждаемся произведением:",
            "msg_getHentai_tags": "Теги:",
            "msg_getHentai_id_warn": "Неверный код",
			"msg_getHentai_nsfw_warn": "Хентай доступен только в nsfw каналах :sob:",
            "msg_getHentai_fetch_error": "Произошла ошибка. Может это знак?",
            "msg_imgToAscII_error": "Не удалось сохранить файл UwU",
            "msg_imgToAscII_no_files": "В сообщении нет вложений ¯\\_(ツ)_/¯",
            "msg_clear_error": "Какая ошибка могла случится во время удаления сообщений?",
            "emd_help_author": "Список команд:",
            "msg_addMeme_access_denied": "У вас нет доступа к этой команде ¯\\_(ツ)_/¯",
            "msg_addMeme_empty_message": "В сообщении нет вложений (╥ω╥)",
            "msg_addMeme_file_saved": "сохранён",
            "msg_addMeme_file_error": "Не удалось сохранить файл UwU",
            "msg_deleteMeme_success": "удалён",
            "msg_deleteMeme_access_denied": "У вас нет доступа к этой команде ¯\\_(ツ)_/¯",
            "msg_deleteMeme_channel_error": "Для использования этой команды нужно находиться в канале с мемами",
            "msg_deleteMeme_cache_error": "Не помню, какой мем слал последним ¯\\_(ツ)_/¯",
			"msg_startMemes_success": "Поехали (￣^￣)ゞ",
            "msg_startMemes_aleready_started": "Я уже отправляю мемы >_<",
            "msg_startMemes_speed_error": "Слишком быстро!",
			"msg_startMemes_no_channel_warn": "Для использования этой функции на сервере должен быть специальный канал",
            "msg_startMemes_file_error": "Ошибка во врея отправки мема",
			"msg_startMemes_no_memes": "OMG нет мемов в базе данных :scream:",
            "msg_stopMemes_success": ":(",
            "msg_stopMemes_empty_interval": "Нечего останавливать",
			"msg_doEmojis_on": "Эмодзи включены!:white_check_mark:",
			"msg_doEmojis_off": "Эмодзи выключены!:negative_squared_cross_mark:",
            "msg_doEmojis_args_warn": "Передайте on или off",
			"msg_doEmojis_access_warn": "Эта команда доступна только администраторам :confused:",
            "msg_doEmojis_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_setMemesChannel_success": "Канал дял мемов: ",
            "msg_setMemesChannel_argument_warn": "Канал без названия?",
            "msg_setMemesChannel_permission_warn": "Эта команда доступна только администраторам :confused:",
			"msg_setPrefix_success": "Новый префикс: ",
			"msg_setPrefix_access_warn": "Эта команда доступна только администраторам :confused:",
            "msg_setPrefix_empty_warn": "Префикс не может быть пустым",
            "msg_setPrefix_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_deleteEmoji_success": "Реакция удалена",
            "msg_deleteEmoji_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
            "msg_setEmoji_updated": "Reaction Updated",
            "msg_setEmoji_error": "Это не эмодзи >:(",
            "msg_setEmoji_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
			"msg_setLanguage_success": "Ок, мой новый язык: ",
            "msg_setLanguage_warn": "Бот ещё не переведён на этот язык :sob:",
            "msg_setLanguage_empty": "Пустой язык?",
            "msg_setLanguage_db_error": "Произошла ошибка при записи в базу данных! Попробуйте снова",
			"abt_startmemes": "Регулярно отправлять мемы",
			"abt_stopmemes": "Прекраить отправлять мемы",
			"abt_setlang": "Устаноаить язык [rus, eng]",
			"abt_setemoji": "Выберите реакцию под сообщением",
			"abt_delemoji": "Убрать реакцию под сообщениями",
			"abt_doemojis": "Включить и выключить реакции от бота на сервере",
			"abt_setprefix": "Изменить префикс на сервере",
            "abt_setmemeschannel": "Изменить канал для мемов",
			"abt_addmeme": "Добавить мем в коллекцию (с огранниченным доступом)",
			"abt_delmeme": "Удалить мем из коллекции (с огранниченным доступом)",
			"abt_gethentai": "Хотите читать хентай в любимом чате? Без проблем (^_~)",
			"abt_imgtoascii": "Конвертировать картинку в текстовый файл",
            "abt_clear": "Удаляет сообщения бота из этого канала",
			"abt_help": "Помощь",
            "dsc_startmemes": "Шлёт дерьмовые мемы в специальный канал для мемов (стандартный bot-memes). Частоту в секундах можно передать в аргументе (стандартная 600 секунд).",
			"dsc_stopmemes": "Прекраить отправлять мемы",
			"dsc_setlang": "В аргументе код языка, в будующем бот будет переводиться на большее количество языков.",
			"dsc_setemoji": "Напишите команду и через пробел эмоджи для реакции под сообщением (если функция включена на сервере). Можно использовать дефолтные и эмоджи с серверов, на которых есть этот бот",
			"dsc_delemoji": "Убрать реакцию под сообщениями",
			"dsc_doemojis": "on - вкл. off - выкл.",
			"dsc_setprefix": "Такое могут только админы",
            "dsc_setmemeschannel": "Такое могут только админы",
			"dsc_addmeme": "Естественно только для создатля бота. Никому не дам качать что-то на мой комп",
			"dsc_delmeme": "Естественно только для создатля бота. Никому не дам удалять что-то -_-",
			"dsc_gethentai": "Найти мангу с nhentai по коду. Работает не всегда, т.к. нужет vpn",
			"dsc_imgtoascii": "Конвертировать картинку в текстовый файл",
            "dsc_clear": "Можно указать количество сообщений, которое нужно удалить",
			"dsc_help": "Показывает это сообщение"
        }
    }
}