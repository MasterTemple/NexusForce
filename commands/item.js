module.exports = {
    name: ['item', 'loot'],
    description: 'Info about an item in LEGO Universe',
    args: true,
    use: `item [id]`,
    example: [`item 7415`],
    execute(message, args, params) {
        function err() {
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                //console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        if((args.length !== 1 || isNaN(args[0])) && (params['send_to_dm'] === false && params['edit_message'] === false) ){
            //console.log(args, params['send_to_dm'], params['edit_message'])
            let findOne = require(`./../functions/findOneItem.js`)
            var itemID = findOne.execute(args)
            if(itemID===undefined){
                message.channel.send("An item with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else if(args.length === 1 && !isNaN(args[0])){
            var itemID = args[0]
        }
        //console.log(args.length > 1, isNaN(args[0]), params['send_to_dm'] === false, params['edit_message'] === false)
        // const itemID = id
        const item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`);
        const { uIcon, luExplorerURL, resURL, unknownImageURL, emojis} = require('./../config.json')
        let img = `${resURL}${item.iconURL}`

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
        if(item?.itemComponent?.levelRequirement === null || item?.itemComponent?.levelRequirement === undefined){
            //console.log(item.itemComponent.levelRequirement)
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
        if(item?.itemInfo?.name === undefined){
            item.itemInfo.name = "None"
        }
        if(item?.itemInfo?.description === undefined || item?.itemInfo?.description === ``){
            item.itemInfo.description = "None"
        }
        if(item?.itemInfo?.internalNotes === undefined || item.itemInfo.internalNotes === ""){
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

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        var isConsumable = false
        if(item?.itemComponent?.equipLocationNames?.length === 1){
            var description = `**Equip Location:** ${item.itemComponent.equipLocationNames[0]}`
        }else if(item?.itemComponent?.equipLocationNames?.length === 0 && item?.skillIDs?.length !== 0){
            var description = `**Equip Location:** Consumable`
            isConsumable = true
        }
        else if(item?.itemComponent?.equipLocationNames?.length === 0 && item?.skillIDs?.length === 0){
            var description = `**Equip Location:** Model`
            isConsumable = true
        }else{
            var description = `**Equip Locations:** ${item?.itemComponent?.equipLocationNames?.join(`, `)}`
        }
        // if(item?.itemComponent?.equipLocationNames?.length === 0){
        //     var description = `**Equip Location:** Consumable`
        //
        // }
        let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, description, `${luExplorerURL}objects/${itemID}`, img)



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
                    {name: "Ability Cost", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.imaginationcost} Imagination`, inline: true},
                    {name: "Cooldown", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldowngroup, inline: true},
                )
            }
            else if(item?.itemComponent?.equipLocation[0] !== 'special_r' && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info){
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
                embed.addFields(
                    {name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name, value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.rawDescription, inline: false},
                )
                embed.addFields(
                    {name: "Ability Cost", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.imaginationcost} Imagination`, inline: true},
                    {name: "Cooldown", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldowngroup, inline: true},
                )
            }
            else if(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && isConsumable){
                embed.addFields(
                    {name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name, value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.rawDescription, inline: false},
                )
                embed.addFields(
                    {name: "Ability Cost", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.imaginationcost} Imagination`, inline: true},
                    {name: "Cooldown", value: `${item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldown} Seconds`, inline: true},
                    {name: "Cooldown Group", value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.cooldowngroup, inline: true},
                )

            }
            if(item.itemComponent.equipLocation[0] === 'special_r' && item['objectSkills'][Object.keys(item.objectSkills)[skill]]['castOnType'] !== 1){
                //console.log(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']])
                if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.projectileDamageComboArray.length !== 0) {
                    let projectileArray = item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.projectileDamageComboArray
                    if((item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpArmorRestore.length !== 0 || item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpImaginationRestore.length !== 0) && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.projectileChargeUpDamage > 0){
                        projectileArray.unshift(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.projectileChargeUpDamage)
                    }
                    if(projectileArray.length > 0) {
                        var combo = projectileArray.join('+')
                    }else{
                        var combo = item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo
                    }


                    embed.addFields(
                        {
                            name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name,
                            value: combo,
                            inline: true
                        },
                        {
                            name: "Single Jump Smash",
                            value: `${item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.singleJumpSmash} Damage`,
                            inline: true
                        },
                        {
                            name: "Double Jump Smash",
                            value: `${item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.doubleJumpSmash} Damage`,
                            inline: true
                        },
                    )
                }
                else if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.damageComboArray) {
                    if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.damageComboArray.length > 0){
                        var combo = item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.damageComboArray.join('+')
                    }else{
                        var combo = item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo
                    }
                    embed.addFields(
                        {
                            name: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name,
                            value: combo,
                            inline: true
                        },
                        {
                            name: "Single Jump Smash",
                            value: `${item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.singleJumpSmash} Damage`,
                            inline: true
                        },
                        {
                            name: "Double Jump Smash",
                            value: `${item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.doubleJumpSmash} Damage`,
                            inline: true
                        },
                    )
                }


                if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.hasChargeUp && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpArmorRestore.length === 0 && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpImaginationRestore.length === 0) {
                    embed.addFields(
                        {
                            name: "Charge Up",
                            value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.ChargeUp,
                            inline: true
                        },
                        {
                            name: "Charge Up Cost",
                            value: `${Math.abs(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpCost)} Imagination`,
                            inline: true
                        },
                        {
                            name: "Charge Up Damage",
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpCombo,
                            inline: true
                        },

                    )
                }
                if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.hasChargeUp && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpArmorRestore.length === 0 && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpImaginationRestore.length !== 0) {
                    embed.addFields(
                        {
                            name: "Charge Up",
                            value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.ChargeUp,
                            inline: false
                        },
                        {
                            name: "Charge Up Cost",
                            value: `0 Imagination`,
                            inline: true
                        },
                        {
                            name: "Imagination Restored",
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpImaginationRestore.join(` -> `),
                            inline: true
                        },
                        { name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },

                    )
                }
                if(item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.hasChargeUp && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpArmorRestore.length !== 0 && item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpImaginationRestore.length === 0) {
                    embed.addFields(
                        {
                            name: "Charge Up",
                            value: item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.ChargeUp,
                            inline: false
                        },
                        {
                            name: "Charge Up Cost",
                            value: `0 Imagination`,
                            inline: true
                        },
                        {
                            name: "Armor Restored",
                            value: item['overview'][item['objectSkills'][Object.keys(item.objectSkills)[skill]]['behaviorID']]?.chargeUpArmorRestore.join(` -> `),
                            inline: true
                        },
                        { name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },

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
                    {name: "Ability Cost", value: `${item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.imaginationcost} Imagination`, inline: true},
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
                    {name: "Ability Cost", value: `${item['proxySkills'][Object.keys(item.proxySkills)[skill]]?.imaginationcost} Imagination`, inline: true},
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
        if(item.itemInfo.type === "Loot" && isConsumable === false)
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
        }else if(item.overview.length === 1  && item.projectileDamageInfo.projectileDamageCombo !== ""){
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

        try {

            let drop_button = new params.buttons.MessageButton()
                .setStyle('blurple')
                .setLabel('Drop')
                .setID('drop')
            let earn_button = new params.buttons.MessageButton()
                .setStyle('blurple')
                .setLabel('Earn')
                .setID('earn')
            let buy_button = new params.buttons.MessageButton()
                .setStyle('blurple')
                .setLabel('Buy')
                .setID('buy')
            let more_button = new params.buttons.MessageButton()
                .setStyle('blurple')
                .setLabel('More')
                .setID('item_more')

            if(item.buyAndDrop.Vendors.length === 0){
                buy_button.setDisabled(true)
            }
            if(Object.keys(item.earn).length === 0){
                earn_button.setDisabled(true)
            }
            if(item.buyAndDrop.EnemyIDs.length === 0){
                drop_button.setDisabled(true)
            }

            if(params['send_to_dm'] === true){
                message.author.send({ buttons: [
                        drop_button, earn_button, buy_button, more_button
                    ], embed: embed })
            }
            else if(params['edit_message'] === true) {
                message.edit({ buttons: [
                        drop_button, earn_button, buy_button, more_button
                    ], embed: embed })
            }
            else {
                message.channel.send({ buttons: [
                        drop_button, earn_button, buy_button, more_button
                    ], embed: embed })
            }

            // if(args[1] !== 'dm') {
            //     message.channel.send(embed)
            // }else if(args[1] === 'dm'){
            //     message.author.send(embed)
            // }
        }catch(e){
            console.log(e)
            err()
        }
    }
}
