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

        if(item.Armor === undefined){
            item.Armor = 0
        }
        if(item.Health === undefined){
            item.Health = 0
        }
        if(item.Imagination === undefined){
            item.Imagination = 0
        }
        if(item.description === null){
            item.description = "None"
        }
        if(item.internalNotes === null){
            item.internalNotes = "None"
        }
        if(item.levelRequirement === null){
            item.levelRequirement = "None"
        }


        let msgEmbed = require(`./embedTemplate.js`)
        if(item.equipLocationNames.length === 1){
            //var description = `**Equip Location:** ${item.equipLocationNames[0]}`
        }else{
            var description = `**Equip Locations:** ${item.equipLocationNames.join(`, `)}`
        }
        let embed = msgEmbed.execute(item.displayName, description, `https://lu-explorer.web.app/objects/${item.itemID}`, item.iconURL)
        embed.addFields(
            { name: 'Name', value: item.name, inline: true },
            { name: 'Description', value: item.description, inline: true },
            { name: 'Internal Notes', value: item.internalNotes, inline: true },
        )


        if(item.isWeapon === false && item.abilityName !== undefined){
            embed.addFields(
                {name: item.abilityName, value: item.localeDescription, inline: false},
                // { name: item.abilityName, value: item.localeDescription, inline: true },
                // { name: item.abilityName, value: item.localeDescription, inline: true },
            )
        }

        embed.addFields(

            { name: 'Armor', value: item.Armor, inline: true },
            { name: 'Health', value: item.Health, inline: true },
            { name: 'Imagination', value: item.Imagination, inline: true },
        )

        if(item.isWeapon === true && item.projectileDamageInfo.projectileDamageCombo === ""){
            embed.addFields(
                {name: "Damage Combo", value: item.meleeDamageInfo.damageCombo, inline: true},
                {name: "Singe Jump Smash", value: item.meleeDamageInfo.singleJumpSmash, inline: true},
                {name: "Double Jump Smash", value: item.meleeDamageInfo.doubleJumpSmash, inline: true},
            )
        }else if(item.isWeapon === true && item.projectileDamageInfo.projectileDamageCombo !== ""){
            embed.addFields(
                {name: "Damage Combo", value: item.projectileDamageInfo.projectileDamageCombo, inline: true},
                {name: "Singe Jump Smash", value: item.meleeDamageInfo.singleJumpSmash, inline: true},
                {name: "Double Jump Smash", value: item.meleeDamageInfo.doubleJumpSmash, inline: true},
            )
        }

        if(item.isWeapon && item.meleeDamageInfo.chargeUpDamage !== undefined && item.projectileDamageInfo.chargeUpIsProjectile === false){
            embed.addFields(
                {name: "Charge Up Ability", value: item.chargeUpDescription, inline: true},
                {name: "Charge Up Damage", value: item.meleeDamageInfo.chargeUpDamage, inline: true},
                {name: "Charge Up Cost", value: `${item.meleeDamageInfo.chargeUpImaginationCost} Imagination`, inline: true},
            )
        }else if(item.isWeapon && item.meleeDamageInfo.chargeUpDamage !== undefined && item.projectileDamageInfo.chargeUpIsProjectile){
            embed.addFields(
                {name: "Charge Up Ability", value: item.chargeUpDescription, inline: true},
                {name: "Charge Up Damage", value: item.projectileDamageInfo.chargeUpDamage, inline: true},
                {name: "Charge Up Cost", value: `${item.meleeDamageInfo.chargeUpImaginationCost} Imagination`, inline: true},
            )
        }



            if(item.isWeapon && item.allItems.length !== 1){
            embed.addFields(
                {name: "Imagination Cost", value: item.abilityImaginationCost, inline: true},
                {name: "Cooldown Time", value: `${item.cooldownTime} Seconds`, inline: true},
                {name: "Cooldown Group", value: item.cooldowngroup, inline: true},
            )
        }

        if(item.isWeapon === false && item.abilityImaginationCost !== undefined && item.cooldownTime !== undefined && item.cooldowngroup !== undefined){
            embed.addFields(
                {name: "Imagination Cost", value: item.abilityImaginationCost, inline: true},
                {name: "Cooldown Time", value: `${item.cooldownTime} Seconds`, inline: true},
                {name: "Cooldown Group", value: item.cooldowngroup, inline: true},
            )
        }

        if(item.factionTokens !== null){
            embed.addFields(
                {name: "Cost", value: item.price, inline: true},
                {name: "Faction Token Cost", value: item.factionTokens, inline: true},
                {name: "Level Requirement", value: item.levelRequirement, inline: true},
            )
        }else if(item.commendationCost !== null){
            embed.addFields(
                {name: "Cost", value: item.price, inline: true},
                {name: "Commendation Cost", value: `${item.commendationCost} Faction Tokens`, inline: true},
                {name: "Level Requirement", value: item.levelRequirement, inline: true},
            )
        }else if(item.commendationCost === null){
            embed.addFields(
                {name: "Cost", value: item.price, inline: true},
                {name: "Stack Size", value: item.stackSize, inline: true},
                {name: "Level Requirement", value: item.levelRequirement, inline: true},
            )
        }

        message.channel.send(embed)

    }
}
