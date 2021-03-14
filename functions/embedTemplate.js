module.exports = {
    execute(title, description, url, thumbnail) {
        const {inviteLink, iconURL, footer} = require('./../config.json');


        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle(title)
            .setURL(url)
            .setAuthor(`Nexus Force`, iconURL, inviteLink)

            .setThumbnail(thumbnail)
            //.addFields(
            //    { name: 'Display Name', value: displayName, inline: true },
            //    { name: 'Internal Notes', value: internalNotes, inline: true },
            //    { name: 'Brick Name', value: title, inline: true },
            //)

            //.setImage(thumbnail)
            .setTimestamp()
            .setFooter(footer, iconURL);

        if(description !== undefined ){
            embed.setDescription(description)
        }

        return embed
    }
}
