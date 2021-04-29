module.exports = {
    name: ['brick'],
    description: 'Info about LEGO Brick in LEGO Universe',
    args: true,
    use: `brick [name or ID]`,
    example: [`brick tail fin 2x3x2`,`brick 3`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                return
            } catch (error) {
                console.error(error);
            }
        }
        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneBrick.js`)
            var itemID = findOne.execute(args)
            if(itemID===undefined){
                message.channel.send("A LEGO Brick with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var itemID = args[0]
        }
        // const itemID = id
        const item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`);
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        let img = `${resURL}${item.iconURL}`

        //console.log(itemID)

        // message.channel.send(`\`\`\`${JSON.stringify(item,null,2)}\`\`\``)

        if(item?.itemComponent?.levelRequriement === null || item?.itemComponent?.levelRequriement === undefined){
            item.itemComponent.levelRequirement = 0
        }
        if(item.name === null){
            item.name = "None"
        }
        if(item.itemInfo.description === null || item.itemInfo.description === `` || item.itemInfo.description === undefined){
            item.itemInfo.description = "None"
        }
        if(item.itemInfo.internalNotes === null || item.itemInfo.internalNotes === `` || item.itemInfo.internalNotes === undefined){
            item.itemInfo.internalNotes = "None"
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

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        // if(item?.equipLocationNames?.length === 1){
        //     //var description = `**Equip Location:** ${item.equipLocationNames[0]}`
        // }else{
        //     var description = `**LEGO Brick:**}`
        // }
        let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined, `${luExplorerURL}objects/${item.objectID}`, img)

        embed.addFields(
            { name: 'Name', value: item.itemInfo.name, inline: true },
            { name: 'Description', value: item.itemInfo.description, inline: true },
            { name: 'Internal Notes', value: item.itemInfo.internalNotes, inline: true },
        )
        item.itemComponent.stackSize = 999


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
            message.channel.send(embed)
        }catch{
            err()
        }

    }
}
