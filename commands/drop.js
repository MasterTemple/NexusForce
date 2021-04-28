module.exports = {
    name: ['drop'],
    description: 'See what drops an item',
    args: true,
    use: `drop [name or ID]`,
    example: ['drop red parrot', `drop 7570`],
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
            let findOne = require(`./../functions/fineOneBrickOrItem.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("A LEGO Brick or item with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var dropFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(dropFile.itemComponent.levelRequirement === undefined){
            dropFile.levelRequirement = 0
        }
        let img
        if(dropFile.iconURL !== "uIcon" || dropFile.iconUFL !== "unknown" && dropFile.iconURL.includes('http') === false){
            img = `${resURL}${dropFile.iconURL}`
        }else if(dropFile.iconURL.includes('http')){
            img = dropFile.iconURL
        }else if(dropFile.iconURL === "unknown"){
            img = unknownImageURL
        }else{
            img = uIcon
        }
        //console.log(img)

        let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, img)


        var vendorInfo = ``
        var dropsSomething = false
        let c = 0
        let wasDMed = false
        for(var e=0;e<Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length;e++){

            // if(dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].displayName !== null) {
            //     vendorInfo = `${vendorInfo}${dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].displayName} [${dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].id}]\n`
            // }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName !== undefined) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    // console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)

                }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)

                }
                dropsSomething = true
            }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent.lenth !== 0 && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]] !== undefined && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]].includes("Wishing") === false && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]].includes("Race") === false) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)

                }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)

                }
                dropsSomething = true
            }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName !== undefined) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)

                }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent*10000)/10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)

                }
                dropsSomething = true
            }

            if(embed.fields.length > 25){
                message.author.send(embed)
                embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, dropFile.iconURL)
                wasDMed = true
            }

            c++
            if(c === Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length && embed.fields.length !== 0 && wasDMed){
                message.author.send(embed)
                message.channel.send("Direct Messages Sent!")
                //embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, dropFile.iconURL)
            }else if(c === Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length && embed.fields.length !== 0){
                message.channel.send(embed)
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
        if(!dropsSomething){
            embed.addField(`This Item Is Not Dropped`, "Try **!earn** or **!buy** to see how to unlock this item!", false)
            message.channel.send(embed)

        }



        //message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)

        try {
            //message.channel.send(embed)
        }catch{
            err()
        }

    }
}
