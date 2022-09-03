# Emojis bot

Discord bot for reacting messages with customizable emojis.

# Features

<ul>
    <li>Customizable reactions</li>
    <li>Bot changes it's avatar and nickname every 5 minutes</li>
    <li>Greets new server members</li>
    <li>Supports two languages russian and english</li>
    <li>Switchable prefix</li>
    <li>Can monitor your lifetime in DM</li>
    <li>All commands are executable in DM</li>
</ul>

# Preview

# Tecnologies

Node.js with typescript

discord.js v14 library for interacting with discord api

Mongo DB for storing users data

Cron for scheduling tasks

# Usage

## Clone repository

clone repository
```
git clone https://github.com/DEsimas/emojis-bot
```
add .env file with all neded variables

install dependencies
```
npm i
```
build project
```
npm run build
```
start bot
```
npm run start
```

## Import library

install bot to your project
```
npm i emojis-bot
```
create .env file and declare variable MODE with value PACKAGE
```
MODE = PACKAGE
```
import and start bot
```
import { Bot } from "emojis-bot";
const bot = new Bot({token: <token goes here>, mongo_uri: <mongodb uri goes here>});
bot.start();
```

# .env

<table>
    <tr>
        <th>TOKEN</th>
        <th>token for discord bot</th>
    </tr>
    <tr>
        <th>MONGO</th>
        <th>mongodb uri</th>
    </tr>
    </tr>
        <th>MODE</th>
        <th>state "BOT" to launch as idependent application, something else for using bot as package</th>
    <tr>
</table>