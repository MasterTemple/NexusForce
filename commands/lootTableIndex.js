module.exports = {
    name: ['loottableindex', 'lti'],
    description: 'See what enemies drop an item',
    args: true,
    use: `lti [id]`,
    example: [`lti 670`],
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
        let msgEmbed = require(`./../functions/embedTemplate.js`)

        if(args.length > 1 || isNaN(args[0])){

                message.channel.send("A LootTableIndex value is always a number.")
                err()
                return

        }else{
            var objectID = args[0]
        }

        try{
            var iconURL = `https://static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest?cb=20121121213649`

            var LootTableIndexFile = require(`./../json/LootTableIndex/${objectID}.json`)
            if(LootTableIndexFile.items.length === 1){
                var embed = msgEmbed.execute(`LootTableIndex: ${LootTableIndexFile.LootTableIndex} - ${LootTableIndexFile.items.length} item`, undefined, `https://github.com/MasterTemple/NexusForce/tree/main/JSON/LootTableIndex/${objectID}`, iconURL)
            }else{
                var embed = msgEmbed.execute(`LootTableIndex: ${LootTableIndexFile.LootTableIndex} - ${LootTableIndexFile.items.length} items`, undefined, `https://github.com/MasterTemple/NexusForce/tree/main/JSON/LootTableIndex/${objectID}`, iconURL)
            }
            if(LootTableIndexFile.items.length !== 0){
                //var embed = msgEmbed.execute(LootTableIndexFile.displayName, undefined, `https://lu-explorer.web.app/objects/${LootTableIndexFile.id}`, LootTableIndexFile.iconURL)

                //console.log(LootTableIndexFile)

                for (var e = 0; e < LootTableIndexFile.items.length; e++) {
                    //embed.addField(`${LootTableIndexFile.dropStuff[e].percent}% Chance to Drop`, `${LootTableIndexFile.dropStuff[e].destructibleComponents[0].displayName}[${LootTableIndexFile.dropStuff[e].destructibleComponents[0].objectID}]`,true)

                    // for(var c=0;c<LootTableIndexFile.items[e].items.length;c++){
                    //     //embed.addField(`${LootTableIndexFile.items[e].percent}% For ${LootTableIndexFile.items[e].minToDrop}-${LootTableIndexFile.items[e].maxToDrop}`, `${LootTableIndexFile.items[e].items[c].displayName}[${LootTableIndexFile.items[e].items[c].itemID}]`, true)
                    //     console.log((LootTableIndexFile.items[e].items))
                    // }
                    embed.addField(LootTableIndexFile.items[e].displayName, `${LootTableIndexFile.items[e].name} [${LootTableIndexFile.items[e].itemID}]`, true)


                    // if (LootTableIndexFile.dropStuff[e].minToDrop === LootTableIndexFile.dropStuff[e].maxToDrop) {
                    //     embed.addField(`${LootTableIndexFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${LootTableIndexFile.dropStuff[e].percent}% chance to drop ${LootTableIndexFile.dropStuff[e].minToDrop} of ${LootTableIndexFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    // } else {
                    //     embed.addField(`${LootTableIndexFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${LootTableIndexFile.dropStuff[e].percent}% chance to drop between ${LootTableIndexFile.dropStuff[e].minToDrop} and ${LootTableIndexFile.dropStuff[e].maxToDrop} of ${LootTableIndexFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    // }
                }
            }else{
                var itemFile = require(`./../json/Items/${objectID}.json`)
                //var embed = msgEmbed.execute(itemFile.displayName, undefined, `https://lu-explorer.web.app/objects/${itemFile.itemID}`, itemFile.iconURL)
                var embed = msgEmbed.execute(`${itemFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${itemFile.id}`, itemFile.iconURL)
                embed.addField(`This Item Is Not Dropped!`, "Try **!buy** or **!earn** to see how to unlock this item!", false)
            }

        }catch(error){
            var LootTableIndexFile = require(`./../json/groupEnemies/EnemyInfo/${objectID}.json`)
            var embed = msgEmbed.execute(`${LootTableIndexFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${objectID}`, LootTableIndexFile.iconURL)
            //message.channel.send(embed)
            console.log(error)
            embed.addField(`This is not a valid LootTableIndex!`, "Maybe this is just an error, idk...", false)

        }


        //message.channel.send(`\`\`\`json\n${JSON.stringify(LootTableIndexFile,null, 2)}\`\`\``)
        message.channel.send(embed)



    }
}
