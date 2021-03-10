module.exports = {
    name: ['item'],
    description: 'Info about an item in LEGO Universe',
    args: true,
    use: `item [id]`,
    example: [`item 7415`],
    execute(message, id) {
        const itemID = id
        const item = require(`./../json/Items/${Math.floor(itemID/256)}/${itemID}.json`);

        console.log(item)

        // message.channel.send(`\`\`\`${JSON.stringify(item,null,2)}\`\`\``)

        let msgEmbed = require(`./embedTemplate.js`)
        if(item.equipLocationNames.length === 1){
            var description = `**Equip Location:** ${item.equipLocationNames[0]}`
        }else{
            var description = `**Equip Locations:** ${item.equipLocationNames.join(`, `)}`
        }
        let embed = msgEmbed.execute(item.displayName, description, `https://lu-explorer.web.app/objects/${item.itemID}`, item.iconURL)
        embed.addFields(
            { name: 'Name', value: item.name, inline: true },
            { name: 'Description', value: item.description, inline: true },
            { name: 'Internal Notes', value: item.internalNotes, inline: true },
        )
        embed.addFields(

            { name: 'Armor', value: item.Armor, inline: true },
            { name: 'Health', value: item.Health, inline: true },
            { name: 'Imagination', value: item.Imagination, inline: true },
        )
        embed.addFields(
            { name: item.abilityName, value: item.localeDescription, inline: false },
            // { name: item.abilityName, value: item.localeDescription, inline: true },
            // { name: item.abilityName, value: item.localeDescription, inline: true },
        )
        embed.addFields(
            { name: "Imagination Cost", value: item.abilityImaginationCost, inline: true },
            { name: "Cooldown Time", value: `${item.cooldownTime} Seconds`, inline: true },
            { name: "Cooldown Group", value: item.cooldowngroup, inline: true },
        )

        embed.addFields(
            { name: "Cost", value: item.price, inline: true },
            { name: "Faction Token Cost", value: item.factionTokens, inline: true },
            { name: "Level Requirement", value: item.levelRequirement, inline: true },
        )

        message.channel.send(embed)

    }
}
