const { Collection, Client, Intents } = require('discord.js-selfbot');
const fs = require('fs');
const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", // lets you request guild members (i.e. fixes the issue)
]);
const client = new Client({ ws: { intents } })
module.exports = client;
const config = require('./config.json')
const token = config.token

client.dev = ['479987197844652042', '580329636894867466'];
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = require('./config.json')
client.emotes = require('./emoji.json')

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(token)