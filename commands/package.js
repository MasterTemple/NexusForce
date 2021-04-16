module.exports = {
    name: ['package', 'p'],
    description: 'See what packages an item',
    args: true,
    use: `package [id]`,
    example: [`package 13102`],
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
            let findOne = require(`./../functions/findOnePackage.js`)
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
        var packageFile = require(`./../output/packages/${objectID}.json`)
        //packageFile = require('./../output/references')
        //console.log(packageFile)
        //console.log(packageFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        // if(packageFile.itemComponent.levelRequirement === undefined){
        //     packageFile.levelRequirement = 0
        // }

        //let embed = msgEmbed.execute(packageFile.displayName, undefined,`https://lu-explorer.web.app/objects/${packageFile.objectID}`, packageFile.iconURL)

        // if(packageFile.itemComponent.altCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: packageFile.itemComponent.buyPrice, inline: true},
        //         {name: `${packageFile.itemComponent.altCurrencyDisplayName} Cost`, value: packageFile.itemComponent.altCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: packageFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(packageFile.itemComponent.commendationCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: packageFile.itemComponent.buyPrice, inline: true},
        //         {name: `${packageFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: packageFile.itemComponent.commendationCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: packageFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(packageFile.itemComponent.commendationCurrencyCost === null){
        //     embed.addFields(
        //         {name: "Cost", value: packageFile.itemComponent.buyPrice, inline: true},
        //         {name: "Stack Size", value: packageFile.itemComponent.stackSize, inline: true},
        //         {name: "Level Requirement", value: packageFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }
        // message.channel.send(embed)
        // return
        var description = ``
        let config = require(`./../config.json`)
        for(let p=0; p<packageFile.LootTableIndexes.length;p++){
            description = `${description}**${packageFile.LootTableIndexes[p].names.Name} [${packageFile.LootTableIndexes[p].LootTableIndex}]**\n`
            let arr = []
            //console.log(Object.keys(packageFile.LootTableIndexes[p].rarityTableInfo))
            for(let k=0;k<Object.keys(packageFile.LootTableIndexes[p].rarityTableInfo).length;k++){
                arr.push(Object.keys(packageFile.LootTableIndexes[p].rarityTableInfo)[k])
            }
            //console.log(arr)
            description = `${description}__(Specific)__ `
            for(let i=1; i<=arr.length;i++){
                description = `${description}**T${i}:** ${(packageFile.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `

                //description = `${description} ${config.emojis[`rarity${i}`]} ${(packageFile.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
            }
            description = `${description}\n__(Any)__ `

            for(let i=1; i<=arr.length;i++){
                description = `${description}**T${i}:** ${(packageFile.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `

                //description = `${description} ${config.emojis[`rarity${i}`]} ${(packageFile.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
            }
            description = `${description}\n\n`
            // try {
            //     // description = `${description}**${packageFile.LootTableIndexes[p].names.Name} [${packageFile.LootTableIndexes[p].LootTableIndex}]**`
            //     description = `${description}**T1:**${(packageFile.LootTableIndexes[p].rarityTableInfo['1'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T2:**${(packageFile.LootTableIndexes[p].rarityTableInfo['2'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T3:**${(packageFile.LootTableIndexes[p].rarityTableInfo['3'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T4:**${(packageFile.LootTableIndexes[p].rarityTableInfo['4'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% \n`
            // }catch{}
        }
        let embed = msgEmbed.execute(`${packageFile.itemInfo.displayName} [${packageFile.objectID}]`, description,`https://lu-explorer.web.app/objects/${packageFile.objectID}`, packageFile.iconURL)
        //console.log(description)



        //message.channel.send(`\`\`\`json\n${JSON.stringify(packageFile,null, 2)}\`\`\``)

        message.channel.send(embed)


    }
}
