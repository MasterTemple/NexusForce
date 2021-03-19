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
            var enemyInfoFile = require(`./../json/groupEnemies/EnemyInfo/${objectID}.json`)
            var embed = msgEmbed.execute(`${enemyInfoFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${objectID}`, enemyInfoFile.iconURL)

            var enemyDropFile = require(`./../json/groupEnemies/EnemyLootItems/${objectID}.json`)

            if(enemyDropFile.LootTable.length !== 0){
                //var embed = msgEmbed.execute(enemyInfoFile.displayName, undefined, `https://lu-explorer.web.app/objects/${enemyInfoFile.id}`, enemyInfoFile.iconURL)

                //console.log(enemyInfoFile)

                for (var e = 0; e < enemyDropFile.LootTable.length; e++) {
                    //embed.addField(`${enemyInfoFile.dropStuff[e].percent}% Chance to Drop`, `${enemyInfoFile.dropStuff[e].destructibleComponents[0].displayName}[${enemyInfoFile.dropStuff[e].destructibleComponents[0].objectID}]`,true)

                    // for(var c=0;c<enemyDropFile.LootTable[e].items.length;c++){
                    //     //embed.addField(`${enemyDropFile.LootTable[e].percent}% For ${enemyDropFile.LootTable[e].minToDrop}-${enemyDropFile.LootTable[e].maxToDrop}`, `${enemyDropFile.LootTable[e].items[c].displayName}[${enemyDropFile.LootTable[e].items[c].itemID}]`, true)
                    //     console.log((enemyDropFile.LootTable[e].items))
                    // }
                    embed.addField(`${enemyDropFile.LootTable[e].percent}% For ${enemyDropFile.LootTable[e].minToDrop}-${enemyDropFile.LootTable[e].maxToDrop}`, `LootTableIndex: ${enemyDropFile.LootTable[e].LootTableIndex}`, true)


                    // if (enemyInfoFile.dropStuff[e].minToDrop === enemyInfoFile.dropStuff[e].maxToDrop) {
                    //     embed.addField(`${enemyInfoFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${enemyInfoFile.dropStuff[e].percent}% chance to drop ${enemyInfoFile.dropStuff[e].minToDrop} of ${enemyInfoFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    // } else {
                    //     embed.addField(`${enemyInfoFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${enemyInfoFile.dropStuff[e].percent}% chance to drop between ${enemyInfoFile.dropStuff[e].minToDrop} and ${enemyInfoFile.dropStuff[e].maxToDrop} of ${enemyInfoFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    // }
                }
            }else{
                var itemFile = require(`./../json/Items/${objectID}.json`)
                //var embed = msgEmbed.execute(itemFile.displayName, undefined, `https://lu-explorer.web.app/objects/${itemFile.itemID}`, itemFile.iconURL)
                var embed = msgEmbed.execute(`${itemFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${itemFile.id}`, itemFile.iconURL)
                embed.addField(`This Item Is Not Dropped!`, "Try **!buy** or **!earn** to see how to unlock this item!", false)
            }

        }catch(error){
            var enemyInfoFile = require(`./../json/groupEnemies/EnemyInfo/${objectID}.json`)
            var embed = msgEmbed.execute(`${enemyInfoFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${objectID}`, enemyInfoFile.iconURL)
            //message.channel.send(embed)
            console.log(error)
            embed.addField(`This is not a valid LootTableIndex!`, "Maybe this is just an error, idk...", false)

        }


        //message.channel.send(`\`\`\`json\n${JSON.stringify(enemyInfoFile,null, 2)}\`\`\``)
        message.channel.send(embed)



    }
}
