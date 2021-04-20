module.exports = {
    name: ['earn'],
    description: 'See where to earn an item',
    args: true,
    use: `earn [id]`,
    example: [`earn 7570`],
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
                message.channel.send("An item with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var earnFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
        //earnFile = require('./../output/references')
        //console.log(earnFile)
        //console.log(earnFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(earnFile.itemComponent.levelRequirement === undefined){
            earnFile.levelRequirement = 0
        }

        //let embed = msgEmbed.execute(earnFile.displayName, undefined,`https://lu-explorer.web.app/objects/${earnFile.objectID}`, earnFile.iconURL)
        let embed = msgEmbed.execute(`${earnFile.itemInfo.displayName} [${earnFile.objectID}]`, undefined,`https://lu-explorer.web.app/objects/${earnFile.objectID}`, earnFile.iconURL)

        // if(earnFile.itemComponent.altCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: earnFile.itemComponent.earnPrice, inline: true},
        //         {name: `${earnFile.itemComponent.altCurrencyDisplayName} Cost`, value: earnFile.itemComponent.altCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: earnFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(earnFile.itemComponent.commendationCurrencyCost !== null){
        //     embed.addFields(
        //         {name: "Cost", value: earnFile.itemComponent.earnPrice, inline: true},
        //         {name: `${earnFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: earnFile.itemComponent.commendationCurrencyCost, inline: true},
        //         {name: "Level Requirement", value: earnFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }else if(earnFile.itemComponent.commendationCurrencyCost === null){
        //     embed.addFields(
        //         {name: "Cost", value: earnFile.itemComponent.earnPrice, inline: true},
        //         {name: "Stack Size", value: earnFile.itemComponent.stackSize, inline: true},
        //         {name: "Level Requirement", value: earnFile.itemComponent.levelRequirement, inline: true},
        //     )
        // }

        var earnInfo = ``

        for(var e=0;e<Object.keys(earnFile.earn).length;e++){
            //console.log([Object.keys(earnFile.earn)])

            // console.log([Object.keys(earnFile.earn)][e])
            // console.log(earnFile.earn[Object.keys(earnFile.earn)[e]])
            //earnInfo = `${earnInfo}${earnFile.earn[Object.keys(earnFile.earn)]['defined_type']} > ${earnFile.earn[Object.keys(earnFile.earn)]['defined_subtype']} > ${earnFile.earn[Object.keys(earnFile.earn)]['missionName']}\n${earnFile.earn[Object.keys(earnFile.earn)]['missionDescription']}\n`
            if(earnFile?.earn[Object.keys(earnFile.earn)[e]]?.rewardCount === 1) {
                embed.addField(`${earnFile.earn[Object.keys(earnFile.earn)[e]]['defined_type']} > ${earnFile.earn[Object.keys(earnFile.earn)[e]]['defined_subtype']} > ${earnFile.earn[Object.keys(earnFile.earn)[e]]['missionName']}`, `${earnFile.earn[Object.keys(earnFile.earn)[e]]['missionDescription']}`, false)
            }else{
                embed.addField(`${earnFile.earn[Object.keys(earnFile.earn)[e]]['defined_type']} > ${earnFile.earn[Object.keys(earnFile.earn)[e]]['defined_subtype']} > ${earnFile.earn[Object.keys(earnFile.earn)[e]]['missionName']}`, `${earnFile.earn[Object.keys(earnFile.earn)[e]]['missionDescription']} [Gives ${earnFile.earn[Object.keys(earnFile.earn)[e]]['rewardCount']}]`, false)

            }
            // if(earnFile.earn[Object.keys(earnFile.earn)][e].displayName !== null) {
            //     earnInfo = `${earnInfo}${earnFile.earn[Object.keys(earnFile.earn)][e]} [${earnFile.earn.Vendors[e].id}]\n`
            // }
        }

        // if(Object.keys(earnFile.earn).length === 1){
        //     embed.addField(`Earn:`, earnInfo, false)
        // }else if(earnFile.earn.Vendors.length > 1){
        //     embed.addField(`Vendors:`, earnInfo, false)
        // }else if(earnFile.commendationVendor.length === 1 && earnFile.commendationCost !== null){
        //     embed.addField(`Vendor:`, `Honor Accolade - Commendation Vendor [13806]`, false)
        // }else if(earnFile.type === "LEGO brick"){
        //     embed.addField(`Vendor:`, `${earnFile.brickVendorDisplayName} [${earnFile.brickVendorID}]`, false)
        // }else{
        //     embed.addField(`This Item Is Not Sold!`, "Try **!earn** or **!drop** to see how to unlock this item!", false)
        // }
        if(Object.keys(earnFile.earn).length === 0){
            embed.addField(`This Item Is Not Earned!`, "Try **!buy** or **!drop** to see how to unlock this item!", false)
        }



        //message.channel.send(`\`\`\`json\n${JSON.stringify(earnFile,null, 2)}\`\`\``)

        try {
            message.channel.send(embed)
        }catch{
            err()
        }

    }
}
