module.exports = {
    name: ['activity', 'activityf'],
    description: 'See what an activity drops',
    args: true,
    use: `activity [name]`,
    example: [`activity Frakjaw 1 Player`],
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
        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneActivity.js`)
            var objectIDArray = findOne.execute(args)
            if(objectIDArray===undefined){
                message.channel.send("An activity with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var objectID = objectIDArray[0]
        var activityName = objectIDArray[1]
        // message.reply(objectID)
        // return
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        const commandName = message.content.slice(1).trim().split(/ +/).shift().toLowerCase(); //each space is a new argument
        let displayFractions = false
        if(commandName === 'activityf'){
            displayFractions = true
        }

        try{
            var activityFile = require(`./../output/activities/${objectID}.json`)
        }catch{
            let embed = msgEmbed.execute(`${activityName} [${objectID}]`, description, `${luExplorerURL}activities/${objectID}`, uIcon)
            embed.addField("Nothing", "This activity has no rewards.", false)
            message.channel.send(embed)
            return
        }
        //activityFile = require('./../output/references')
        //console.log(activityFile)
        //console.log(activityFile)
        //console.log(activityFile)
        //console.log(objectIDArray)

        activityFile = activityFile['activities'][activityName]
        //console.log(activityFile)
        //message.channel.send(objectIDArray)

        // if(activityFile.itemComponent.levelRequirement === undefined){
        //     activityFile.levelRequirement = 0
        // }

        //let embed = msgEmbed.execute(activityFile.displayName, undefined,`${luExplorerURL}activities/${objectID}`, activityFile.iuIcon
        // if(activityFile.itemComponent.altCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: activityFile.itemComponent.buyPrice, inline: true},
        //         {name: `${activityFile.itemComponent.altCurrencyDisplayName} Cost`, value: activityFile.itemComponent.altCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: activityFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(activityFile.itemComponent.commendationCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: activityFile.itemComponent.buyPrice, inline: true},
        //         {name: `${activityFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: activityFile.itemComponent.commendationCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: activityFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(activityFile.itemComponent.commendationCurrencyCost === null){
        //     embed.addFields(
        //         {name: "Cost", value: activityFile.itemComponent.buyPrice, inline: true},
        //         {name: "Stack Size", value: activityFile.itemComponent.stackSize, inline: true},
        //         {name: "Level Requirement", value: activityFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }
        // message.channel.send(embed)
        // return
        var description = ``
        let config = require(`./../config.json`)
        let c = 0
        let wasDMed = false
        for(let p=0; p<activityFile.LootTableIndexes.length;p++){
            if(activityFile.LootTableIndexes[p].names.Name === null || activityFile.LootTableIndexes[p].names.Name === undefined){
                activityFile.LootTableIndexes[p].names.Name = activityFile.LootTableIndexes[p].names.AlternateName
            }
            if(activityFile.LootTableIndexes[p].maxToDrop === 1){
                description = `${description}**${activityFile.LootTableIndexes[p].names.Name}** [[${activityFile.LootTableIndexes[p].LootTableIndex}]](${luExplorerURL}objects/loot/table/${activityFile.LootTableIndexes[p].LootTableIndex}) - **${activityFile.LootTableIndexes[p].percent.toFixed(2)}%** For **1** Item\n`
            }
            else if(activityFile.LootTableIndexes[p].minToDrop === activityFile.LootTableIndexes[p].maxToDrop){
                description = `${description}**${activityFile.LootTableIndexes[p].names.Name}** [[${activityFile.LootTableIndexes[p].LootTableIndex}]](${luExplorerURL}objects/loot/table/${activityFile.LootTableIndexes[p].LootTableIndex}) - **${activityFile.LootTableIndexes[p].percent.toFixed(2)}%** For **${activityFile.LootTableIndexes[p].minToDrop}** Items\n`
            }else{
                description = `${description}**${activityFile.LootTableIndexes[p].names.Name}** [[${activityFile.LootTableIndexes[p].LootTableIndex}]](${luExplorerURL}objects/loot/table/${activityFile.LootTableIndexes[p].LootTableIndex}) - **${activityFile.LootTableIndexes[p].percent.toFixed(2)}%** For **${activityFile.LootTableIndexes[p].minToDrop} - ${activityFile.LootTableIndexes[p].maxToDrop}** Items\n`

            }
            let arr = []
            //console.log(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo))

            // for(let k=0;k<Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo).length;k++){
            //     arr.push(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo)[k])
            //     console.log(activityFile.LootTableIndexes[p].rarityCount[k])
            //     // if(activityFile.LootTableIndexes[p].rarityCount[k] > 0) {
            //     //     arr.push(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo)[k])
            //     // }
            // }
            //let c = 0
            for(let k=0;k<Object.keys(activityFile.LootTableIndexes[p].rarityCount).length;k++){
                //console.log(k, activityFile.LootTableIndexes[p].rarityCount[k])
                //console.log(k, activityFile.LootTableIndexes[p].rarityCount[k], Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo))
                if(activityFile.LootTableIndexes[p].rarityCount[k] > 0 && Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo).includes(k.toString())) {
                    //console.log("--", k, activityFile.LootTableIndexes[p].rarityCount[k])

                    arr.push(k)
                }
                //console.log(activityFile.LootTableIndexes[p].rarityCount[k])
                // if(activityFile.LootTableIndexes[p].rarityCount[k] > 0) {
                //     arr.push(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo)[k])
                // }
            }

            // console.log(activityFile.LootTableIndexes[p].names.Name)
            // console.log(arr)

            //console.log(arr)
            if (arr.length !== 0) {
                description = `${description}__(Specific)__ `
                for (let i = 0; i < arr.length; i++) {
                    if(displayFractions) {
                        description = `${description}**T${arr[i]}:** 1 in ${Math.round(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForSpecific)} `
                    }else{
                        description = `${description}**T${arr[i]}:** ${(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                    }
                }
                description = `${description}\n__(Any)__ `

                for (let i = 0; i < arr.length; i++) {
                    if(displayFractions) {
                        description = `${description}**T${arr[i]}:** 1 in ${Math.round(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForAny)} `
                    }else{
                        description = `${description}**T${arr[i]}:** ${(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `
                    }
                    //description = `${description} ${config.emojis[`rarity${i}`]} ${(activityFile.drop.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                }
                description = `${description}\n\n`
                // try {
                //     // description = `${description}**${activityFile.LootTableIndexes[p].names.Name} [${activityFile.LootTableIndexes[p].LootTableIndex}]**`
                //     description = `${description}**T1:**${(activityFile.LootTableIndexes[p].rarityTableInfo['1'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T2:**${(activityFile.LootTableIndexes[p].rarityTableInfo['2'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T3:**${(activityFile.LootTableIndexes[p].rarityTableInfo['3'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T4:**${(activityFile.LootTableIndexes[p].rarityTableInfo['4'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% \n`
                // }catch{}}
            }else{
                description = `${description}\n`


            }
            if(description.length > 1900){
                let embed = msgEmbed.execute(`${activityName} [${objectID}]`, description,`${luExplorerURL}activities/${objectID}`, uIcon)
                message.author.send(embed)
                description = ''
                wasDMed = true
            }
            c++
            if(c === activityFile.LootTableIndexes.length && description !== '' && wasDMed){
                let embed = msgEmbed.execute(`${activityName} [${objectID}]`, description,`${luExplorerURL}activities/${objectID}`, uIcon)
                message.author.send(embed)
                message.channel.send("Direct Messages Sent!")
            }else if(c === activityFile.LootTableIndexes.length && description !== ''){
                let embed = msgEmbed.execute(`${activityName} [${objectID}]`, description,`${luExplorerURL}activities/${objectID}`, uIcon)
                message.channel.send(embed)
            }

            }
        if(activityFile.LootTableIndexes.length === 0 && wasDMed === false) {
            let embed = msgEmbed.execute(`${activityName} [${objectID}]`, description, `${luExplorerURL}activities/${objectID}`, uIcon)
            embed.addField("Nothing", "This activity has no rewards.", false)
            message.channel.send(embed)
        }

        // let embed = msgEmbed.execute(`${activityName} [${activityFile.objectID}]`, description,`${luExplorerURL}activities/${objectID}`, activityFile.i
        // //console.log(description)
        //
        //
        //
        // //message.channel.send(`\`\`\`json\n${JSON.stringify(activityFile,null, 2)}\`\`\``)
        //
        // try {
        //     message.channel.send(embed)
        // }catch{
        //     err()
        // }


    }

}
