module.exports = {
    name: ['drop'],
    description: 'See what drops an item',
    args: true,
    use: `drop [id]`,
    example: [`drop 7570`],
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
            let findOne = require(`./../functions/findOneObject.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var dropFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
        //dropFile = require('./../output/references')
        //console.log(dropFile)
        //console.log(dropFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(dropFile.itemComponent.levelRequirement === undefined){
            dropFile.levelRequirement = 0
        }

        //let embed = msgEmbed.execute(dropFile.displayName, undefined,`https://lu-explorer.web.app/objects/${dropFile.objectID}`, dropFile.iconURL)
        let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`https://lu-explorer.web.app/objects/${dropFile.objectID}`, dropFile.iconURL)

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

        var vendorInfo = ``

        for(var e=0;e<Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length;e++){

            // if(dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].displayName !== null) {
            //     vendorInfo = `${vendorInfo}${dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].displayName} [${dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].id}]\n`
            // }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName !== undefined) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)

                }else {
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }

        }

        // if(dropFile.buyAndDrop.Vendors.length === 1){
        //     embed.addField(`Vendor:`, vendorInfo, false)
        // }else if(dropFile.buyAndDrop.Vendors.length > 1){
        //     embed.addField(`Vendors:`, vendorInfo, false)
        // }else if(dropFile.commendationVendor.length === 1 && dropFile.commendationCost !== null){
        //     embed.addField(`Vendor:`, `Honor Accolade - Commendation Vendor [13806]`, false)
        // }else if(dropFile.type === "LEGO brick"){
        //     embed.addField(`Vendor:`, `${dropFile.brickVendorDisplayName} [${dropFile.brickVendorID}]`, false)
        // }else{
        //     embed.addField(`This Item Is Not Sold!`, "Try **!earn** or **!drop** to see how to unlock this item!", false)
        // }



        //message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)

        message.channel.send(embed)


    }
}
