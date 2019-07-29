const site = {};
//general
site.guildid = '290843998296342529';
site.token = 'token from discord bot goes here'

//my wrapper
site.discordapi = 'https://discordapp.com/api'
site.botHeader = {"Authorization": "Bot "+site.token, 'Content-Type': 'application/json'};


module.exports = site;
