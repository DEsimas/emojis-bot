import { config } from 'dotenv';
import { Bot } from './Bot';

config();

if(!process.env.TOKEN) throw new Error("Token not found");
if(!process.env.MONGO) throw new Error("Mongo uri not found");

const bot = new Bot();
bot.connectDB();
bot.login();