module.exports = {
    name: ['buy'],
    description: 'See where to buy an item',
    args: true,
    use: `buy [name or ID]`,
    example: [`buy grey kepi`, `buy 7793`],
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
        var buyFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
        //buyFile = require('./../output/references')
            //console.log(buyFile)
        //console.log(buyFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(buyFile.itemComponent.levelRequirement === undefined){
            buyFile.levelRequirement = 0
        }
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')

        //let embed = msgEmbed.execute(buyFile.displayName, undefined,`${luExplorerURL}objects/${buyFile.objectID}`, buyFile.iconURL)
        let embed = msgEmbed.execute(`${buyFile.itemInfo.displayName} [${buyFile.objectID}]`, undefined,`${luExplorerURL}objects/${buyFile.objectID}`, buyFile.iconURL)

        if(buyFile.itemComponent.altCurrencyCost !== null){
            embed.addFields(
                {name: "Cost", value: buyFile.itemComponent.buyPrice, inline: true},
                {name: `${buyFile.itemComponent.altCurrencyDisplayName} Cost`, value: buyFile.itemComponent.altCurrencyCost, inline: true},
                {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement, inline: true},
            )
        }else if(buyFile.itemComponent.commendationCurrencyCost !== null){
            embed.addFields(
                {name: "Cost", value: buyFile.itemComponent.buyPrice, inline: true},
                {name: `${buyFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: buyFile.itemComponent.commendationCurrencyCost, inline: true},
                {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement, inline: true},
            )
        }else if(buyFile.itemComponent.commendationCurrencyCost === null){
            embed.addFields(
                {name: "Cost", value: buyFile.itemComponent.buyPrice, inline: true},
                {name: "Stack Size", value: buyFile.itemComponent.stackSize, inline: true},
                {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement, inline: true},
            )
        }

        var vendorInfo = ``
        if(buyFile.buyAndDrop?.Vendors?.length === 0){
            buyFile.buyAndDrop.Vendors = []
        }
        if(buyFile.commendationVendor===undefined){
            buyFile.commendationVendor = []
        }
        for(var e=0;e<buyFile.buyAndDrop.Vendors.length;e++){
            if(buyFile.buyAndDrop.Vendors[e].displayName !== null) {
                vendorInfo = `${vendorInfo}${buyFile.buyAndDrop.Vendors[e].displayName} [${buyFile.buyAndDrop.Vendors[e].id}]\n`
            }
        }

        if(buyFile.buyAndDrop.Vendors.length === 1){
            embed.addField(`Vendor:`, vendorInfo, false)
        }else if(buyFile.buyAndDrop.Vendors.length > 1){
            embed.addField(`Vendors:`, vendorInfo, false)
        }else if(buyFile.commendationVendor.length === 1 && buyFile.commendationCost !== null){
            embed.addField(`Vendor:`, `Honor Accolade - Commendation Vendor [13806]`, false)
        }else if(buyFile.type === "LEGO brick"){
            embed.addField(`Vendor:`, `${buyFile.brickVendorDisplayName} [${buyFile.brickVendorID}]`, false)
        }else{
            embed.addField(`This Item Is Not Sold!`, "Try **!earn** or **!drop** to see how to unlock this item!", false)
        }



        //message.channel.send(`\`\`\`json\n${JSON.stringify(buyFile,null, 2)}\`\`\``)

        try {
            message.channel.send(embed)
        }catch{
            err()
        }

    }
}
