module.exports = {
    name: ['buy'],
    description: 'See where to buy an item',
    args: true,
    use: `buy [id]`,
    example: [`buy 7570`],
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
        var buyFile = require(`./../json/Buy/${Math.floor(objectID/256)}/${objectID}.json`)

            console.log(buyFile)

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(buyFile.levelRequirement === undefined){
            buyFile.levelRequirement = 0
        }

        //let embed = msgEmbed.execute(buyFile.displayName, undefined,`https://lu-explorer.web.app/objects/${buyFile.objectID}`, buyFile.iconURL)
        let embed = msgEmbed.execute(`${buyFile.displayName} [${objectID}]`, undefined,`https://lu-explorer.web.app/objects/${buyFile.objectID}`, buyFile.iconURL)

        if(buyFile.factionTokens !== null && buyFile.factionTokens !== undefined){
            embed.addFields(
                {name: "Cost", value: buyFile.price, inline: true},
                {name: "Faction Token Cost", value: buyFile.factionTokens, inline: true},
                {name: "Level Requirement", value: buyFile.levelRequirement, inline: true},
            )
        }else if(buyFile.commendationCost !== null && buyFile.commendationCost !== undefined){
            embed.addFields(
                {name: "Cost", value: buyFile.price, inline: true},
                {name: "Commendation Cost", value: `${buyFile.commendationCost} Faction Tokens`, inline: true},
                {name: "Level Requirement", value: buyFile.levelRequirement, inline: true},
            )
        }else if(buyFile.commendationCost === null){
            embed.addFields(
                {name: "Cost", value: buyFile.price, inline: true},
                {name: "Stack Size", value: buyFile.stackSize, inline: true},
                {name: "Level Requirement", value: buyFile.levelRequirement, inline: true},
            )
        }else if(buyFile.type === "LEGO brick"){
            embed.addFields(
                {name: "Cost", value: buyFile.price, inline: true},
                {name: "Stack Size", value: buyFile.stackSize, inline: true},
                {name: "Level Requirement", value: buyFile.levelRequirement, inline: true},
            )
        }

        var vendorInfo = ``
        if(buyFile.vendors===undefined){
            buyFile.vendors = []
        }
        if(buyFile.commendationVendor===undefined){
            buyFile.commendationVendor = []
        }
        for(var e=0;e<buyFile.vendors.length;e++){

            vendorInfo = `${vendorInfo}${buyFile.vendors[e].vendorDisplayName} [${buyFile.vendors[e].vendorID}]\n`

        }

        if(buyFile.vendors.length === 1){
            embed.addField(`Vendor:`, vendorInfo, false)
        }else if(buyFile.vendors.length > 1){
            embed.addField(`Vendors:`, vendorInfo, false)
        }else if(buyFile.commendationVendor.length === 1 && buyFile.commendationCost !== null){
            embed.addField(`Vendor:`, `Honor Accolade - Commendation Vendor [13806]`, false)
        }else if(buyFile.type === "LEGO brick"){
            embed.addField(`Vendor:`, `${buyFile.brickVendorDisplayName} [${buyFile.brickVendorID}]`, false)
        }else{
            embed.addField(`This Item Is Not Sold!`, "Try **!earn** or **!drop** to see how to unlock this item!", false)
        }



        //message.channel.send(`\`\`\`json\n${JSON.stringify(buyFile,null, 2)}\`\`\``)

        message.channel.send(embed)


    }
}
