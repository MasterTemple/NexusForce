module.exports = {
    name: ['package', 'p'],
    description: 'See what is in a package',
    args: true,
    use: `package [id]`,
    example: [`package 13102`],
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
        const packageList = [5710,5834, 5835, 5836, 5837, 7586,7589, 7590, 7591, 7609, 8027,8028, 8029, 8030, 8031, 8032,8033, 8034, 9466, 9467, 9468,9469, 9470, 9471, 9472, 9603,9721, 9722, 9723, 9724, 9725,9726, 9773, 9774, 9775, 9776,9953, 9954, 9955, 10012, 10095,10096, 10165, 10312, 10316, 10396,10397, 10398, 10399, 10400, 10401,10417, 10458, 10513, 10514, 10515,10516, 10700, 11160, 11161, 11162,11181, 11256, 11309, 11310, 11311,11312, 11313, 11314, 11315, 11316,11317, 12114, 12115, 12220, 12221,12222, 12223, 12224, 12225, 12226,12231, 12282, 12338, 12339, 12424,12425, 12462, 12521, 12522, 12523,12524, 12525, 12526, 12527, 12528,12529, 12557, 12558, 12559, 12560,12889, 12890, 12891, 13073, 13097,13099, 13102, 13103, 13109, 13110,13112, 13113, 13117, 13134, 13135,13136, 13137, 13138, 13139, 13140,13141, 13143, 13144, 13145, 13146,13529, 13604, 13623, 13624, 13625,13737, 14125, 14126, 14127, 14147,14148, 14195, 14196, 14197, 14198,14679, 14680, 14767, 14768, 14769,14770, 14771, 14772, 14773, 14774,14775, 14776, 14777, 14778, 15976,15977, 15978, 15979, 15980, 15982,15983]

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOnePackage.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }

        if(!packageList.includes(parseInt(objectID))){
            message.channel.send(`Object [${objectID}] is not a package`)
            return
        }

        try{
            var packageFile = require(`./../json/Packages/${objectID}.json`)
            var embed = msgEmbed.execute(`${packageFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${objectID}`, packageFile.iconURL)

            //var packageFile = require(`./../json/groupEnemies/EnemyLootItems/${objectID}.json`)

            if(packageFile.table.length !== 0){
                //var embed = msgEmbed.execute(packageFile.displayName, undefined, `https://lu-explorer.web.app/objects/${packageFile.id}`, packageFile.iconURL)

                //console.log(packageFile)
                var ltiNameFile = require(`./../json/Reference/LootTableIndexNames.json`)

                for (var e = 0; e < packageFile.table.length; e++) {
                    //embed.addField(`${packageFile.dropStuff[e].percent}% Chance to Drop`, `${packageFile.dropStuff[e].destructibleComponents[0].displayName}[${packageFile.dropStuff[e].destructibleComponents[0].objectID}]`,true)

                    // for(var c=0;c<packageFile.table[e].items.length;c++){
                    //     //embed.addField(`${packageFile.table[e].percent}% For ${packageFile.table[e].minToDrop}-${packageFile.table[e].maxToDrop}`, `${packageFile.table[e].items[c].displayName}[${packageFile.table[e].items[c].itemID}]`, true)
                    //     console.log((packageFile.table[e].items))
                    // }
                    // embed.addField(`${packageFile.table[e].percent}% For ${packageFile.table[e].minToDrop}-${packageFile.table[e].maxToDrop}`, `LootTableIndex: ${packageFile.table[e].LootTableIndex}`, true)
                    let ltiName;
                    let lti = packageFile.table[e].LootTableIndex
                    if(ltiNameFile.data[lti].Name !== undefined){
                        ltiName = ltiNameFile.data[lti].Name
                    }else{
                        ltiName = ltiNameFile.data[lti].AlternateName

                    }
                    if (packageFile.table[e].minToDrop === packageFile.table[e].maxToDrop) {
                        //    embed.addField(`${packageFile.table[e].percent}% For ${packageFile.table[e].minToDrop}`, `LootTableIndex: ${packageFile.table[e].LootTableIndex}\nType: Loot`, true)
                        //embed.addField(`Drops ${packageFile.table[e].minToDrop}`, `${packageFile.table[e].percent}% Chance for LootTableIndex: ${packageFile.table[e].LootTableIndex}`, true)
                        embed.addField(`${packageFile.table[e].minToDrop} Loot: ${packageFile.table[e].percent}%`, `${ltiName} [${lti}]`, true)
                    } else {
                        //    embed.addField(`${packageFile.table[e].percent}% For ${packageFile.table[e].minToDrop}-${packageFile.table[e].maxToDrop}`, `LootTableIndex: ${packageFile.table[e].LootTableIndex}\nType: Loot`, true)
                        //embed.addField(`Drops ${packageFile.table[e].minToDrop}-${packageFile.table[e].maxToDrop}`, `${packageFile.table[e].percent}% Chance for LootTableIndex: ${packageFile.table[e].LootTableIndex}`, true)
                        embed.addField(`${packageFile.table[e].minToDrop}-${packageFile.table[e].maxToDrop} Loot: ${packageFile.table[e].percent}%`, `${ltiName} [${lti}]`, true)
                    }


                    // if (packageFile.dropStuff[e].minToDrop === packageFile.dropStuff[e].maxToDrop) {
                    //     embed.addField(`${packageFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${packageFile.dropStuff[e].percent}% chance to drop ${packageFile.dropStuff[e].minToDrop} of ${packageFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    // } else {
                    //     embed.addField(`${packageFile.dropStuff[e].destructibleComponents[0].displayName}`, `Has a ${packageFile.dropStuff[e].percent}% chance to drop between ${packageFile.dropStuff[e].minToDrop} and ${packageFile.dropStuff[e].maxToDrop} of ${packageFile.dropStuff[e].differentItemsToDropRange} different items.`, false)
                    // }
                }
            }else{
                var itemFile = require(`./../json/Items/${objectID}.json`)
                //var embed = msgEmbed.execute(itemFile.displayName, undefined, `https://lu-explorer.web.app/objects/${itemFile.itemID}`, itemFile.iconURL)
                var embed = msgEmbed.execute(`${itemFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${itemFile.id}`, itemFile.iconURL)
                embed.addField(`This Item Is Not Dropped!`, "Try **!buy** or **!earn** to see how to unlock this item!", false)
            }

        }catch(error){
            var packageFile = require(`./../json/Packages/${objectID}.json`)
            var embed = msgEmbed.execute(`${packageFile.displayName} [${objectID}]`, undefined, `https://lu-explorer.web.app/objects/${objectID}`, packageFile.iconURL)
            //message.channel.send(embed)
            console.log(error)
            embed.addField(`This package does not drop anything!`, "Maybe this is just an error, idk...", false)

        }


        //message.channel.send(`\`\`\`json\n${JSON.stringify(packageFile,null, 2)}\`\`\``)
        message.channel.send(embed)



    }
}
