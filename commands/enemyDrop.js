module.exports = {
    name: ['enemydrop', 'ed'],
    description: 'See what drops an item',
    args: true,
    use: `enemydrop [id]`,
    example: [`enemydrop 13102`],
    execute(message, args) {
        function err() {
            try {
                //const help = require(`./help.js`);
                //help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneEnemy.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
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
        // if(dropFile.itemComponent.levelRequirement === undefined){
        //     dropFile.levelRequirement = 0
        // }

        //let embed = msgEmbed.execute(dropFile.displayName, undefined,`https://lu-explorer.web.app/objects/${dropFile.objectID}`, dropFile.iconURL)

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
        let config = require(`./../config.json`)
        for(let p=0; p<dropFile.drop.LootTableIndexes.length;p++){
            if(dropFile.drop.LootTableIndexes[p].names.Name === null || dropFile.drop.LootTableIndexes[p].names.Name === undefined){
                dropFile.drop.LootTableIndexes[p].names.Name = dropFile.drop.LootTableIndexes[p].names.AlternateName
            }
			if(dropFile.drop.LootTableIndexes[p].maxToDrop === 1){
				description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **1** Item\n`
			}
			else if(dropFile.drop.LootTableIndexes[p].minToDrop === dropFile.drop.LootTableIndexes[p].maxToDrop){
				description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **${dropFile.drop.LootTableIndexes[p].minToDrop}** Items\n`
			}else{
				description = `${description}**${dropFile.drop.LootTableIndexes[p].names.Name}** [${dropFile.drop.LootTableIndexes[p].LootTableIndex}] - **${dropFile.drop.LootTableIndexes[p].percent}%** For **${dropFile.drop.LootTableIndexes[p].minToDrop} - ${dropFile.drop.LootTableIndexes[p].maxToDrop}** Items\n`

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
                    description = `${description}**T${arr[i]}:** ${(dropFile.drop.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `

                    //description = `${description} ${config.emojis[`rarity${i}`]} ${(dropFile.drop.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                }
                description = `${description}\n__(Any)__ `

                for (let i = 0; i < arr.length; i++) {
                    description = `${description}**T${arr[i]}:** ${(dropFile.drop.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `

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

        }
        let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, description,`https://lu-explorer.web.app/objects/${dropFile.objectID}`, dropFile.iconURL)
        //console.log(description)



        //message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)

        message.channel.send(embed)


    }
}
