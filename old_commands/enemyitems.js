module.exports = {
    name: ['enemydrop', 'ed'],
    description: 'See what enemies drop an item',
    args: true,
    use: `enemydrop [id]`,
    example: [`enemydrop 7570`],
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
            let findOne = require(`./old_functions/findOneEnemy.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var ltiNameFile = require(`./../json/Reference/LootTableIndexNames.json`)

        try{
            var enemyInfoFile = require(`./../json/groupEnemies/EnemyInfo/${objectID}.json`)
            var embed = msgEmbed.execute(`${enemyInfoFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${objectID}`, enemyInfoFile.iconURL)

            //var enemyInfoFile = require(`./../json/groupEnemies/EnemyLootItems/${objectID}.json`)

            if(enemyInfoFile.LootTable.length !== 0){
                //var embed = msgEmbed.execute(enemyInfoFile.displayName, undefined, `https://lu-explorer.web.app/objects/${enemyInfoFile.id}`, enemyInfoFile.iconURL)

                //console.log(enemyInfoFile)

                for (var e = 0; e < enemyInfoFile.LootTable.length; e++) {
                    //embed.addField(`${enemyInfoFile.dropStuff[e].percent}% Chance to Drop`, `${enemyInfoFile.dropStuff[e].destructibleComponents[0].displayName}[${enemyInfoFile.dropStuff[e].destructibleComponents[0].objectID}]`,true)

                    // for(var c=0;c<enemyInfoFile.LootTable[e].items.length;c++){
                    //     //embed.addField(`${enemyInfoFile.LootTable[e].percent}% For ${enemyInfoFile.LootTable[e].minToDrop}-${enemyInfoFile.LootTable[e].maxToDrop}`, `${enemyInfoFile.LootTable[e].items[c].displayName}[${enemyInfoFile.LootTable[e].items[c].itemID}]`, true)
                    //     console.log((enemyInfoFile.LootTable[e].items))
                    // }
                    // embed.addField(`${enemyInfoFile.LootTable[e].percent}% For ${enemyInfoFile.LootTable[e].minToDrop}-${enemyInfoFile.LootTable[e].maxToDrop}`, `LootTableIndex: ${enemyInfoFile.LootTable[e].LootTableIndex}`, true)
                    let ltiName;
                    let lti = enemyInfoFile.LootTable[e].LootTableIndex
                    if(ltiNameFile.data[lti].Name !== undefined){
                        ltiName = ltiNameFile.data[lti].Name
                    }else{
                        ltiName = ltiNameFile.data[lti].AlternateName

                    }

                    if (enemyInfoFile.LootTable[e].minToDrop === enemyInfoFile.LootTable[e].maxToDrop) {
                    //    embed.addField(`${enemyInfoFile.LootTable[e].percent}% For ${enemyInfoFile.LootTable[e].minToDrop}`, `LootTableIndex: ${enemyInfoFile.LootTable[e].LootTableIndex}\nType: ${enemyInfoFile.LootTable[e].type}`, true)
                    //     embed.addField(`${enemyInfoFile.LootTable[e].type}: Drops ${enemyInfoFile.LootTable[e].minToDrop}`, `${enemyInfoFile.LootTable[e].percent}% Chance for LootTableIndex: ${enemyInfoFile.LootTable[e].LootTableIndex}`, true)
                        //embed.addField(`${enemyInfoFile.LootTable[e].type}: Drops ${enemyInfoFile.LootTable[e].minToDrop}`, `${enemyInfoFile.LootTable[e].percent}% Chance for: ${ltiName}`, true)
                        embed.addField(`${enemyInfoFile.LootTable[e].minToDrop} ${enemyInfoFile.LootTable[e].type}: ${enemyInfoFile.LootTable[e].percent}%`, `${ltiName} [${lti}]`, true)

                    } else {
                    //    embed.addField(`${enemyInfoFile.LootTable[e].percent}% For ${enemyInfoFile.LootTable[e].minToDrop}-${enemyInfoFile.LootTable[e].maxToDrop}`, `LootTableIndex: ${enemyInfoFile.LootTable[e].LootTableIndex}\nType: ${enemyInfoFile.LootTable[e].type}`, true)
                    //     embed.addField(`${enemyInfoFile.LootTable[e].type}: Drops ${enemyInfoFile.LootTable[e].minToDrop}-${enemyInfoFile.LootTable[e].maxToDrop}`, `${enemyInfoFile.LootTable[e].percent}% Chance for LootTableIndex: ${enemyInfoFile.LootTable[e].LootTableIndex}`, true)
                        //embed.addField(`${enemyInfoFile.LootTable[e].type}: Drops ${enemyInfoFile.LootTable[e].minToDrop}-${enemyInfoFile.LootTable[e].maxToDrop}`, `${enemyInfoFile.LootTable[e].percent}% Chance for: ${ltiName}`, true)
                        embed.addField(`${enemyInfoFile.LootTable[e].minToDrop}-${enemyInfoFile.LootTable[e].maxToDrop} ${enemyInfoFile.LootTable[e].type}: ${enemyInfoFile.LootTable[e].percent}%`, `${ltiName} [${lti}]`, true)

                    }


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
            embed.addField(`This enemy does not drop anything!`, "Maybe this is just an error, idk...", false)

        }


        //message.channel.send(`\`\`\`json\n${JSON.stringify(enemyInfoFile,null, 2)}\`\`\``)
        message.channel.send(embed)



    }
}
