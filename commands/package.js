module.exports = {
    name: ['package', 'p', 'packagef', 'pf'],
    description: 'See what is in a package',
    args: true,
    use: `package [id]`,
    example: ['package quality surprise pack', `package 13102`],
    execute(message, args, params) {
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
            let findOne = require(`./../functions/findOnePackage.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("A package with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        let displayFractions = false
        const commandName = message.content.slice(1).trim().split(/ +/).shift().toLowerCase(); //each space is a new argument

        if(commandName === 'packagef' || commandName === 'pf'){
            displayFractions = true
        }
        // message.reply(objectID)
        // return
        var packageFile = require(`./../output/packages/${objectID}.json`)

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        var description = ``
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        let img = resURL+packageFile.iconURL
        for(let p=0; p<packageFile.LootTableIndexes.length;p++){
            if(packageFile.LootTableIndexes[p].names.Name === null || packageFile.LootTableIndexes[p].names.Name === undefined){
                packageFile.LootTableIndexes[p].names.Name = packageFile.LootTableIndexes[p].names.AlternateName
            }
            //description = `${description}**${packageFile.LootTableIndexes[p].names.Name}** [${packageFile.LootTableIndexes[p].LootTableIndex}] - **${packageFile.LootTableIndexes[p].percent}%**\n`
			if(packageFile.LootTableIndexes[p].maxToDrop === 1){
				description = `${description}**${packageFile.LootTableIndexes[p].names.Name}** [[${packageFile.LootTableIndexes[p].LootTableIndex}]](${luExplorerURL}objects/loot/table/${packageFile.LootTableIndexes[p].LootTableIndex}) - **${packageFile.LootTableIndexes[p].percent}%** For **1** Item\n`
			}
			else if(packageFile.LootTableIndexes[p].minToDrop === packageFile.LootTableIndexes[p].maxToDrop){
				description = `${description}**${packageFile.LootTableIndexes[p].names.Name}** [[${packageFile.LootTableIndexes[p].LootTableIndex}]](${luExplorerURL}objects/loot/table/${packageFile.LootTableIndexes[p].LootTableIndex}) - **${packageFile.LootTableIndexes[p].percent}%** For **${packageFile.LootTableIndexes[p].minToDrop}** Items\n`
			}else{
				description = `${description}**${packageFile.LootTableIndexes[p].names.Name}** [[${packageFile.LootTableIndexes[p].LootTableIndex}]](${luExplorerURL}objects/loot/table/${packageFile.LootTableIndexes[p].LootTableIndex}) - **${packageFile.LootTableIndexes[p].percent}%** For **${packageFile.LootTableIndexes[p].minToDrop} - ${packageFile.LootTableIndexes[p].maxToDrop}** Items\n`
			}
            let arr = []


            for(let k=0;k<Object.keys(packageFile.LootTableIndexes[p].rarityCount).length;k++){
                //console.log(k, packageFile.LootTableIndexes[p].rarityCount[k])
                if(packageFile.LootTableIndexes[p].rarityCount[k] > 0) {
                    arr.push(k)
                }

            }



            description = `${description}__(Specific)__ `
            for (let i = 0; i < arr.length; i++) {
                if(displayFractions) {
                    description = `${description}**T${arr[i]}:** 1 in ${packageFile.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForSpecific} `
                }else{
                    description = `${description}**T${arr[i]}:** ${(packageFile.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                }
            }
            description = `${description}\n__(Any)__ `

            for (let i = 0; i < arr.length; i++) {
                if(displayFractions) {
                    description = `${description}**T${arr[i]}:** 1 in ${packageFile.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForAny} `
                }else{
                    description = `${description}**T${arr[i]}:** ${(packageFile.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `
                }
                //description = `${description} ${config.emojis[`rarity${i}`]} ${(packageFile.drop.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
            }
            description = `${description}\n\n`

        }
        let embed = msgEmbed.execute(`${packageFile.itemInfo.displayName} [${packageFile.objectID}]`, description,`${luExplorerURL}objects/${packageFile.objectID}`, img)
        //console.log(description)



        //message.channel.send(`\`\`\`json\n${JSON.stringify(packageFile,null, 2)}\`\`\``)

        try {
            message.channel.send(embed)
        }catch{
            err()
        }

    }
}
