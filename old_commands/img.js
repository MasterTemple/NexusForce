module.exports = {
    name: ['img'],
    description: 'Get a DLU screenshot',
    args: true,
    use: `img [code]`,
    example: [`img 3`],
    execute(message, args) {
        const {inviteLink, iconURL, footer} = require('./../config.json');

        const client = message.client;
        let channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            //.setTitle(title)
            //.setURL(url)
            .setAuthor(`Nexus Force`, iconURL, inviteLink)
            //.setDescription(description)

            //.setThumbnail(thumbnail)
            //.addFields(
            //    { name: 'Display Name', value: displayName, inline: true },
            //    { name: 'Internal Notes', value: internalNotes, inline: true },
            //    { name: 'Brick Name', value: title, inline: true },
            //)

            .setImage(`http://dlugallery.page.link/${args[0]}`)
            .setTimestamp()
            .setFooter(footer, iconURL);

        client.channels.cache.get(channel).send(embed);
    }
}
