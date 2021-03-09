const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mythranCommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const mythranCommandFiles = fs.readdirSync('./mythranCommands').filter(file => file.endsWith('.js'));

const {prefix, token, startupStatus, botInfo, mythran} = require('./config.json');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    for(var i=0; i < command.name.length; i++) {
        client.commands.set(command.name[i], command);
    }
}
for (const file of mythranCommandFiles) {
    const mythranCommand = require(`./mythranCommands/${file}`);
    for(var i=0; i < mythranCommand.name.length; i++) {
        client.mythranCommands.set(mythranCommand.name[i], mythranCommand);
    }
}

client.once('ready', () => {
    console.log(`${botInfo.name} ${parseFloat(botInfo.version).toFixed( 1)} reporting for duty!`);
    if(startupStatus != undefined) {
        client.user.setPresence({activity: {name: startupStatus}});
    }

})

client.on('message', message => {
    if(message.author.id === client.user.id){return}
    const args = message.content.slice(prefix.length).trim().split(/ +/); //each space is a new argument
    const commandName = args.shift().toLowerCase();

    if (client.mythranCommands.has(commandName) && mythran.includes(message.author.id)){
        const command = client.mythranCommands.get(commandName);
        try {
            command.execute(message);
        } catch (error) {
            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('There was an issue executing that command! 😭');
            }
        }
    }else{
        message.reply("You're not a Mythran! Get back to smashing the Maelstrom!")
    }



    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(message);
    } catch (error) {
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an issue executing that command! 😭');
        }
    }

})

client.login(token);
