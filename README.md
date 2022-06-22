# Emojis bot

## Description

Bot for hanging out in discord. It contans various commands, but it's main purpose is to react users messages.

## Using
This bot can be added on your server using this [link](https://discord.com/api/oauth2/authorize?client_id=883020186339397693&permissions=0&scope=bot)

## Hosting
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

### OR

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

## .env structure
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

## Known issues:
 <ul>
  <li>Commands don't work in DM</li>
  <li>Avatars don't change</li>
  <li>There are vulnerabilities related to asciify-image library</li>
</ul> 