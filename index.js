const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mythranCommands = new Discord.Collection();
client.contributorCommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const mythranCommandFiles = fs.readdirSync('./mythranCommands').filter(file => file.endsWith('.js'));
const contributorCommandFiles = fs.readdirSync('./contributorCommands').filter(file => file.endsWith('.js'));
const buttons = require('discord-buttons')(client);
const button_handler = require(`./functions/buttons/button_handler`)
const {prefix, token, startupStatus, botInfo, mythran, contributor} = require('./config.json');
let params = {
    send_to_dm: false,
    buttons: buttons,
    config: require('./config.json'),
    edit_message: false
}
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
for (const file of contributorCommandFiles) {
    const contributorCommand = require(`./contributorCommands/${file}`);
    for(var i=0; i < contributorCommand.name.length; i++) {
        client.contributorCommands.set(contributorCommand.name[i], contributorCommand);
    }
}


client.once('ready', () => {
    console.log(`${botInfo.name} ${parseFloat(botInfo.version).toFixed( 1)} reporting for duty!`);
    if(startupStatus != undefined) {
        client.user.setPresence({activity: {name: startupStatus}});
    }

})

client.on('clickButton', async (button) => {
    //console.log('button clicked')
    try {
        button_handler.execute(button, params)
    }catch(error){
        button.defer()
        console.log(error)
    }
});

client.on('message', message => {
    if(message.author.id === client.user.id){return}
    const args = message.content.slice(prefix.length).trim().split(/ +/); //each space is a new argument
    const commandName = args.shift().toLowerCase();
    if (message.content[0] !== prefix){return}
    if (client.mythranCommands.has(commandName) && (mythran.includes(message.author.id) || message.author.id === '703120460023463986' || message.author.id === '789705048035688458')){
        const command = client.mythranCommands.get(commandName);
        try {
            command.execute(message, args, params);
        } catch (error) {
            try {
                command.execute(message, args, params);
            } catch (error) {
                console.error(error);
                message.reply('The Maelstrom have broken this command!');
            }
        }
    }else if(client.mythranCommands.has(commandName)){
        message.reply("You're not a Mythran! Get back to smashing the Maelstrom!")
    }

    if (client.contributorCommands.has(commandName) && contributor.includes(message.author.id)){
        const command = client.contributorCommands.get(commandName);
        try {
            command.execute(message, args, params);
        } catch (error) {
            try {
                command.execute(message, args, params);
            } catch (error) {
                console.error(error);
                message.reply('The Maelstrom have broken this command!');
            }
        }
    }else if(client.contributorCommands.has(commandName)){
        message.reply("You're not a contributor! Get back to smashing the Maelstrom!")
    }



    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(message, args, params);
    } catch (error) {
        try {
            command.execute(message, args, params);
        } catch (error) {
            console.error(error);
            message.reply('The Maelstrom have broken this command!');
        }
    }

})

client.login(token);
