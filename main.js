const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const logLoad = require('./logs/logsload');
require('dotenv').config();
const TOKEN = process.env.TOKEN;



const client = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.DirectMessages,]
});
client.commands = new Collection();
module.exports = client;



fs.readdirSync('./handlers').forEach(handler => {
  require(`./handlers/${handler}`)(client);
  logLoad('handlers', handler, true)
});





client.login(TOKEN);


