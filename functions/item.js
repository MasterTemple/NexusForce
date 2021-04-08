module.exports = {
    name: ['item'],
    description: 'Info about an item in LEGO Universe',
    args: true,
    use: `item [id]`,
    example: [`item 7415`],
    execute(message, id) {
        const itemID = id
        const item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`);
        const {emojis} = require('./../config.json');

        //console.log(item)

        // message.channel.send(`\`\`\`${JSON.stringify(item,null,2)}\`\`\``)

        if(item?.stats?.lifeBonusUI === undefined){
            item.stats.lifeBonusUI = 0
        }
        if(item?.stats?.armorBonusUI === undefined){
            item.stats.armorBonusUI = 0
        }
        if(item?.stats?.imBonusUI === undefined){
            item.stats.imBonusUI = 0
        }
        if(item?.itemInfo?.description === null){
            item.itemInfo.description = "None"
        }
        if(item?.itemInfo?.internalNotes === null){
            item.itemInfo.internalNotes = "None"
        }
        if(item?.itemComponent?.levelRequriement === null){
            item.itemComponent.levelRequirement = 0
        }
        if(item.name === null){
            item.name = "None"
        }
        if(item.description === null || item.description === `` || item.description === undefined){
            item.description = "None"
        }
        if(item.internalNotes === null){
            item.internalNotes = "None"
        }
        if(item?.itemComponent?.buyPrice == null){
            item.itemComponent.buyPrice = 0
        }
        if(item?.itemInfo?.name == undefined){
            item.itemInfo.name = "None"
        }
        if(item?.itemInfo?.description == undefined || item?.itemInfo?.description == ``){
            item.itemInfo.description = "None"
        }
        if(item?.itemInfo?.internalNotes == undefined){
            item.itemInfo.internalNotes = "None"
        }
        // console.log(item.itemInfo.name)
        // console.log(item.itemInfo.description)
        // console.log(item.itemInfo.internalNotes)

        for(let skill in Object.keys(item.objectSkills)){

            if(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description){
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
            }
        }

        let msgEmbed = require(`./embedTemplate.js`)
        if(item?.equipLocationNames?.length === 1){
            //var description = `**Equip Location:** ${item.equipLocationNames[0]}`
        }else{
            var description = `**Equip Locations:** ${item?.itemComponent?.equipLocationNames?.join(`, `)}`
        }
        let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, description, `https://lu-explorer.web.app/objects/${item.objectID}`, item.iconURL)

        embed.addFields(
            { name: 'Name', value: item.itemInfo.name, inline: true },
            { name: 'Description', value: item.itemInfo.description, inline: true },
            { name: 'Internal Notes', value: item.itemInfo.internalNotes, inline: true },
        )
        for(let skill in Object.keys(item.objectSkills)){

            if(item.itemComponent.equipLocation[0] !== 'special_r' && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description){
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
                embed.addFields(
                    {name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name, value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description, inline: false},
                )
                embed.addFields(
                    {name: "Imagination Cost", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.imaginationcost, inline: true},
                    {name: "Cooldown", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldowngroup, inline: true},
                )
            }
            else if(item.itemComponent.equipLocation[0] !== 'special_r' && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info){
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
                embed.addFields(
                    {name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name, value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.rawDescription, inline: false},
                )
                embed.addFields(
                    {name: "Imagination Cost", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.imaginationcost, inline: true},
                    {name: "Cooldown", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldowngroup, inline: true},
                )
            }
            if(item.itemComponent.equipLocation[0] === 'special_r' && item['objectSkills'][Object.keys(item.objectSkills)[skill]]['castOnType'] === 0){
                console.log(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']])
                if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.damageComboArray) {
                    embed.addFields(
                        {
                            name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name,
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.damageComboArray.join('+'),
                            inline: true
                        },
                        {
                            name: "Single Jump Smash",
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.singleJumpSmash,
                            inline: true
                        },
                        {
                            name: "Double Jump Smash",
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.doubleJumpSmash,
                            inline: true
                        },
                    )
                }

                if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.hasChargeUp) {
                    embed.addFields(
                        {
                            name: "Charge Up",
                            value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.ChargeUp,
                            inline: true
                        },
                        {
                            name: "Charge Up Cost",
                            value: Math.abs(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpCost),
                            inline: true
                        },
                        {
                            name: "Extra",
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpCombo,
                            inline: true
                        },
                    )
                }


            }
        }
        for(let skill in Object.keys(item.proxySkills)){
            // console.log()
            if(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.name && item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.damageCombo && item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.Description){
                // console.log(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.name)
                // console.log(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.damageCombo)
                // console.log(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.Description)
                embed.addFields(
                    {name: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.name, value: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.Description, inline: false},
                )
                embed.addFields(
                    {name: "Imagination Cost", value: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.imaginationcost, inline: true},
                    {name: "Cooldown", value: `${item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.cooldowngroup, inline: true},
                )
            }
            else if(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info){
                // console.log(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.name)
                // console.log(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.damageCombo)
                // console.log(item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.Description)
                embed.addFields(
                    {name: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.name, value: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.info?.rawDescription, inline: false},
                )
                embed.addFields(
                    {name: "Imagination Cost", value: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.imaginationcost, inline: true},
                    {name: "Cooldown", value: `${item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.cooldowngroup, inline: true},
                )
            }
        }


        if(item.isWeapon === false && item.abilityName !== undefined && item.equipLocation[0] !== "chest" && item.equipLocation[0] !== "legs" && item.localeDescription !== undefined){
            embed.addFields(
                {name: item.abilityName, value: item.localeDescription, inline: false},
                // { name: item.abilityName, value: item.localeDescription, inline: true },
                // { name: item.abilityName, value: item.localeDescription, inline: true },
            )
        }
        if(item.isWeapon === false && item.abilityName !== undefined && item.equipLocation[0] !== "chest" && item.equipLocation[0] !== "legs" && item.localeDescription !== undefined){
            embed.addFields(
                {name: item.abilityName, value: item.localeDescription, inline: false},
                // { name: item.abilityName, value: item.localeDescription, inline: true },
                // { name: item.abilityName, value: item.localeDescription, inline: true },
            )
        }
        embed.addFields(
            { name: `${emojis.armor} Armor`, value: item?.stats?.armorBonusUI, inline: true },
            { name: `${emojis.heart} Health`, value: item?.stats?.lifeBonusUI, inline: true },
            { name: `${emojis.imagination} Imagination`, value: item?.stats?.imBonusUI, inline: true },
        )

        if(item.overview.length == 1  === true && item.projectileDamageInfo.projectileDamageCombo === ""){
            embed.addFields(
                {name: "Damage Combo", value: item.meleeDamageInfo.damageCombo, inline: true},
                {name: "Singe Jump Smash", value: item.meleeDamageInfo.singleJumpSmash, inline: true},
                {name: "Double Jump Smash", value: item.meleeDamageInfo.doubleJumpSmash, inline: true},
            )
        }else if(item.overview.length == 1  && item.projectileDamageInfo.projectileDamageCombo !== ""){
            embed.addFields(
                {name: "Damage Combo", value: item.projectileDamageInfo.projectileDamageCombo, inline: true},
                {name: "Singe Jump Smash", value: item.meleeDamageInfo.singleJumpSmash, inline: true},
                {name: "Double Jump Smash", value: item.meleeDamageInfo.doubleJumpSmash, inline: true},
            )
        }

        if(item.overview.length == 1 && item.meleeDamageInfo.chargeUpDamage !== undefined && item.projectileDamageInfo.chargeUpIsProjectile === false){
            embed.addFields(
                {name: "Charge Up Ability", value: item.chargeUpDescription, inline: true},
                {name: "Charge Up Damage", value: item.meleeDamageInfo.chargeUpDamage, inline: true},
                {name: "Charge Up Cost", value: `${item.meleeDamageInfo.chargeUpImaginationCost} Imagination`, inline: true},
            )
        }else if(item.overview.length == 1  && item.meleeDamageInfo.chargeUpDamage !== undefined && item.projectileDamageInfo.chargeUpIsProjectile){
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


        if(item.itemComponent.altCurrencyCost !== null){
            embed.addFields(
                {name: "Cost", value: item.itemComponent.buyPrice, inline: true},
                {name: `${item.itemComponent.altCurrencyDisplayName} Cost`, value: item.itemComponent.altCurrencyCost, inline: true},
                {name: "Level Requirement", value: item.itemComponent.levelRequirement, inline: true},
            )
        }else if(item.itemComponent.commendationCurrencyCost !== null){
            embed.addFields(
                {name: "Cost", value: item.itemComponent.buyPrice, inline: true},
                {name: `${item.itemComponent.commendationCurrencyDisplayName} Cost`, value: item.itemComponent.commendationCurrencyCost, inline: true},
                {name: "Level Requirement", value: item.itemComponent.levelRequirement, inline: true},
            )
        }else if(item.itemComponent.commendationCurrencyCost === null){
            embed.addFields(
                {name: "Cost", value: item.itemComponent.buyPrice, inline: true},
                {name: "Stack Size", value: item.itemComponent.stackSize, inline: true},
                {name: "Level Requirement", value: item.itemComponent.levelRequirement, inline: true},
            )
        }

        message.channel.send(embed)

    }
}
