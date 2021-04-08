module.exports = {
    name: ['drop', 'd'],
    description: 'See what enemies drop an item',
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
        let msgEmbed = require(`./old_functions/embedTemplate.js`)

        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./old_functions/findOneObject`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }

        try{
            var dropFile = require(`./../json/Drops/Drops 2.0/${Math.floor(objectID / 256)}/${objectID}.json`)

            if(dropFile.dropStuff.length !== 0){
                //var embed = msgEmbed.execute(dropFile.displayName, undefined, `https://lu-explorer.web.app/objects/${dropFile.id}`, dropFile.iconURL)
                var embed = msgEmbed.execute(`${dropFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${dropFile.id}`, dropFile.iconURL)

                console.log(dropFile)
                for (var e = 0; e < dropFile.dropStuff.length; e++) {
                    //embed.addField(`${dropFile.dropStuff[e].percent}% Chance to Drop`, `${dropFile.dropStuff[e].destructibleComponents[0].displayName}[${dropFile.dropStuff[e].destructibleComponents[0].objectID}]`,true)

                    if (dropFile.dropStuff[e].minToDrop === dropFile.dropStuff[e].maxToDrop) {
                        embed.addField(`${dropFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${dropFile.dropStuff[e].percent}% chance to drop ${dropFile.dropStuff[e].minToDrop} of ${dropFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    } else {
                        embed.addField(`${dropFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${dropFile.dropStuff[e].percent}% chance to drop between ${dropFile.dropStuff[e].minToDrop} and ${dropFile.dropStuff[e].maxToDrop} of ${dropFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    }
                }
            }else{
                var itemFile = require(`./../json/Items/${Math.floor(objectID / 256)}/${objectID}.json`)
                //var embed = msgEmbed.execute(itemFile.displayName, undefined, `https://lu-explorer.web.app/objects/${itemFile.itemID}`, itemFile.iconURL)
                var embed = msgEmbed.execute(`${itemFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${itemFile.id}`, itemFile.iconURL)
                embed.addField(`This Item Is Not Dropped!`, "Try **!buy** or **!earn** to see how to unlock this item!", false)
            }

        }catch{
            var itemFile = require(`./../json/Items/${Math.floor(objectID / 256)}/${objectID}.json`)
            //var embed = msgEmbed.execute(itemFile.displayName, undefined, `https://lu-explorer.web.app/objects/${itemFile.itemID}`, itemFile.iconURL)
            var embed = msgEmbed.execute(`${itemFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${itemFile.id}`, itemFile.iconURL)

            embed.addField(`This Item Is Not Dropped!`, "Try **!buy** or **!earn** to see how to unlock this item!", false)
        }


        //message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)
        message.channel.send(embed)



    }
}
