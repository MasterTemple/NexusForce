module.exports = {
    name: ['test'],
    description: 'Just testing perms',
    args: true,
    use: `test`,
    example: [`test`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`./contributor.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        const Discord = require('discord.js');
        const buttons = require('discord-buttons')
        const {inviteLink, botIconURL, footer} = require('./../config.json');

        let myembed = new Discord.MessageEmbed()
            .setColor('#351ba3')
            //.setDescription('HERE IS A BUTTON FOR A DLU KEY')
            .setTitle('This a test button:')
            // .setAuthor(`Nexus Force`, botIconURL, inviteLink)
            // .setURL('https://lu-explorer.web.app/dashboard')
            // .setImage('https://pbs.twimg.com/profile_banners/1108450464541097985/1554476978')

        let btn = new buttons.MessageButton()
            .setStyle('blurple') //default: blurple
            //.setURL('https://www.darkflameuniverse.org/')
            .setLabel('Test!') //default: NO_LABEL_PROVIDED
            .setID('test') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
        //.setDisabled(); //disables the button | default: false
        //
        //
        // let objects = new buttons.MessageButton()
        //     .setStyle('url') //default: blurple
        //     .setURL('https://lu-explorer.web.app/objects')
        //     .setLabel('Objects') //default: NO_LABEL_PROVIDED
        //     .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
        //
        // let dashboard = new buttons.MessageButton()
        //     .setStyle('url') //default: blurple
        //     .setURL('https://lu-explorer.web.app/dashboard')
        //     .setLabel('Dashboard') //default: NO_LABEL_PROVIDED
        //     .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
        //
        // let zones = new buttons.MessageButton()
        //     .setStyle('url') //default: blurple
        //     .setURL('https://lu-explorer.web.app/zones')
        //     .setLabel('Zones') //default: NO_LABEL_PROVIDED
        //     .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
        // let missions = new buttons.MessageButton()
        //     .setStyle('url') //default: blurple
        //     .setURL('https://lu-explorer.web.app/missions')
        //     .setLabel('Missions') //default: NO_LABEL_PROVIDED
        //     .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
        //
        // let activities = new buttons.MessageButton()
        //     .setStyle('url') //default: blurple
        //     .setURL('https://lu-explorer.web.app/activities')
        //     .setLabel('Activities') //default: NO_LABEL_PROVIDED
        //     .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
        //
        // let scripts = new buttons.MessageButton()
        //     .setStyle('url') //default: blurple
        //     .setURL('https://lu-explorer.web.app/scripts')
        //     .setLabel('Scripts') //default: NO_LABEL_PROVIDED
        //     .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')

        message.channel.send({ buttons: [
                btn
            ], embed: myembed });

        //message.channel.send('**Button:**', {button: btn})

    }
}
