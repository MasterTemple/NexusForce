module.exports = {
    execute(message, title, description, url, thumbnail, fields) {
        const {inviteLink, botIconURL, footer} = require('./../config.json');

        const client = message.client;
        let channel = message.channel.toString();
        channel = channel.substring(2, channel.length-1);

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, botIconURL, inviteLink)
            .setDescription(description)

            .setThumbnail(thumbnail)
            //.addFields(
            //    { name: 'Display Name', value: displayName, inline: true },
            //    { name: 'Internal Notes', value: internalNotes, inline: true },
            //    { name: 'Brick Name', value: title, inline: true },
            //)

            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter(footer, botIconURL);

        client.channels.cache.get(channel).send(embed);
    }
}
