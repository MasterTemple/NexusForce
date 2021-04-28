module.exports = {
    name: ['enemydrop', 'ed', 'enemydropf', 'edf'],
    description: 'See what an enemy drops',
    args: true,
    use: `enemydrop [id]`,
    example: [`enemydrop GF admiral`, `enemydrop 6789`],
    execute(message, args) {
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
        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneEnemy.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An enemy with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }

        // message.reply(objectID)
        // return
        var dropFile = require(`./../output/enemies/${objectID}.json`)
        //dropFile = require('./../output/references')
        //console.log(dropFile)
        //console.log(dropFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        const commandName = message.content.slice(1).trim().split(/ +/).shift().toLowerCase(); //each space is a new argument
        let displayFractions = false
        if(commandName === 'edf' || commandName === 'enemydropf'){
            displayFractions = true
        }
        // if(dropFile.itemComponent.levelRequirement === undefined){
        //     dropFile.levelRequirement = 0
        // }

        //let embed = msgEmbed.execute(dropFile.displayName, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, img)

        // if(dropFile.itemComponent.altCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: dropFile.itemComponent.buyPrice, inline: true},
        //         {name: `${dropFile.itemComponent.altCurrencyDisplayName} Cost`, value: dropFile.itemComponent.altCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: dropFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(dropFile.itemComponent.commendationCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: dropFile.itemComponent.buyPrice, inline: true},
        //         {name: `${dropFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: dropFile.itemComponent.commendationCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: dropFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(dropFile.itemComponent.commendationCurrencyCost === null){
        //     embed.addFields(
        //         {name: "Cost", value: dropFile.itemComponent.buyPrice, inline: true},
        //         {name: "Stack Size", value: dropFile.itemComponent.stackSize, inline: true},
        //         {name: "Level Requirement", value: dropFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }
        // message.channel.send(embed)
        // return
        var description = ``
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        let c = 0
        let wasDMed = false
        var img
        if(dropFile.iconURL !== "uIcon" || dropFile.iconUFL !== "unknown"){
            img = `${resURL}${dropFile.iconURL}`
        }else if(dropFile.iconURL !== "unknown"){
            img = unknownImageURL
        }else{
            img = uIcon
        }
        for(let p=0; p<dropFile.drop.LootTableIndexes.length;p++){
            if(dropFile.drop.LootTableIndexes[p].names.Name === null || dropFile.drop.LootTableIndexes[p].names.Name === undefined){
                dropFile.drop.LootTableIndexes[p].names.Name = dropFile.drop.LootTableIndexes[p].names.AlternateName
            }
			if(dropFile.drop.LootTableIndexes[p].maxToDrop === 1){
			    if(displayFractions){
                    description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **1** Item\n`
                    // description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}/100** For **1** Item\n`
                }else{
                    description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **1** Item\n`
                }
			}
			else if(dropFile.drop.LootTableIndexes[p].minToDrop === dropFile.drop.LootTableIndexes[p].maxToDrop){
                if(displayFractions){
                    description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **${dropFile.drop.LootTableIndexes[p].minToDrop}** Items\n`
                    // description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}/100** For **${dropFile.drop.LootTableIndexes[p].minToDrop}** Items\n`
                }else {
                    description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **${dropFile.drop.LootTableIndexes[p].minToDrop}** Items\n`
                }
            }else{
                if(displayFractions){
                    description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **${dropFile.drop.LootTableIndexes[p].minToDrop} - ${dropFile.drop.LootTableIndexes[p].maxToDrop}** Items\n`
                    // description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}/100** For **${dropFile.drop.LootTableIndexes[p].minToDrop} - ${dropFile.drop.LootTableIndexes[p].maxToDrop}** Items\n`
                }else{
                    description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **${dropFile.drop.LootTableIndexes[p].minToDrop} - ${dropFile.drop.LootTableIndexes[p].maxToDrop}** Items\n`
                }
			}
            let arr = []
            //console.log(Object.keys(dropFile.drop.LootTableIndexes[p].rarityTableInfo))

            // for(let k=0;k<Object.keys(dropFile.drop.LootTableIndexes[p].rarityTableInfo).length;k++){
            //     arr.push(Object.keys(dropFile.drop.LootTableIndexes[p].rarityTableInfo)[k])
            //     console.log(dropFile.drop.LootTableIndexes[p].rarityCount[k])
            //     // if(dropFile.drop.LootTableIndexes[p].rarityCount[k] > 0) {
            //     //     arr.push(Object.keys(dropFile.drop.LootTableIndexes[p].rarityTableInfo)[k])
            //     // }
            // }
            //let c = 0
            for(let k=0;k<Object.keys(dropFile.drop.LootTableIndexes[p].rarityCount).length;k++){
                //console.log(k, dropFile.drop.LootTableIndexes[p].rarityCount[k])
                if(dropFile.drop.LootTableIndexes[p].rarityCount[k] > 0) {
                    arr.push(k)
                }
                //console.log(dropFile.drop.LootTableIndexes[p].rarityCount[k])
                // if(dropFile.drop.LootTableIndexes[p].rarityCount[k] > 0) {
                //     arr.push(Object.keys(dropFile.drop.LootTableIndexes[p].rarityTableInfo)[k])
                // }
            }

            // console.log(dropFile.drop.LootTableIndexes[p].names.Name)
            // console.log(arr)

            //console.log(arr)
            if (arr.length !== 0) {
                description = `${description}__(Specific)__ `
                for (let i = 0; i < arr.length; i++) {
                    if(displayFractions) {
                        description = `${description}**T${arr[i]}:** 1 in ${dropFile.drop.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForSpecific} `
                    }else{
                        description = `${description}**T${arr[i]}:** ${(dropFile.drop.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                    }
                }
                description = `${description}\n__(Any)__ `

                for (let i = 0; i < arr.length; i++) {
                    if(displayFractions) {
                        description = `${description}**T${arr[i]}:** 1 in ${dropFile.drop.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForAny} `
                    }else{
                        description = `${description}**T${arr[i]}:** ${(dropFile.drop.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `
                    }
                    //description = `${description} ${config.emojis[`rarity${i}`]} ${(dropFile.drop.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                }
                description = `${description}\n\n`
                // try {
                //     // description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name} [${dropFile.drop.LootTableIndexes[p].LootTableIndex}]**`
                //     description = `${description}**T1:**${(dropFile.drop.LootTableIndexes[p].rarityTableInfo['1'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T2:**${(dropFile.drop.LootTableIndexes[p].rarityTableInfo['2'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T3:**${(dropFile.drop.LootTableIndexes[p].rarityTableInfo['3'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T4:**${(dropFile.drop.LootTableIndexes[p].rarityTableInfo['4'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% \n`
                // }catch{}}
            }else{
                description = `${description}\n`


            }
            if(description.length > 1900){
                let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, description,`${luExplorerURL}objects/${dropFile.objectID}`, img)
                message.author.send(embed)
                description = ''
                wasDMed = true
            }
            c++
            if(c === dropFile.drop.LootTableIndexes.length && description !== '' && wasDMed){
                let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, description,`${luExplorerURL}objects/${dropFile.objectID}`, img)
                message.author.send(embed)
                message.channel.send("Direct Messages Sent!")
            }else if(c === dropFile.drop.LootTableIndexes.length && description !== ''){
                let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, description,`${luExplorerURL}objects/${dropFile.objectID}`, img)
                message.channel.send(embed)
            }

        }

        // let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, description,`${luExplorerURL}objects/${dropFile.objectID}`, img)
        // //console.log(description)
        //
        //
        //
        // //message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)
        //
        // try {
        //     message.channel.send(embed)
        // }catch{
        //     err()
        // }

    }
}
