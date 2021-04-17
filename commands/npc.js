module.exports = {
    name: ['npc'],
    description: 'See where to npc an item',
    args: true,
    use: `npc [id]`,
    example: [`npc 7570`],
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
            let findOne = require(`./../functions/findOneNPC.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var npcFile = require(`./../output/npcs/${Math.floor(objectID/256)}/${objectID}.json`)

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        let embed = msgEmbed.execute(`${npcFile.itemInfo.displayName} [${npcFile.objectID}]`, undefined,`https://lu-explorer.web.app/objects/${npcFile.objectID}`, npcFile.iconURL)


        var missionInfo = ``
        if(npcFile.isMissionGiver === 1){
            for (let e = 0; e < Object.keys(npcFile?.missions).length; e++) {
                missionInfo = `${missionInfo}**${e+1}.** __${npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.name}__ [${Object.keys(npcFile?.missions)[e]}]\n`
                missionInfo = `${missionInfo}${npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.description}\n`

            }
        }

        if(Object.keys(npcFile?.missions).length === 1){
            embed.addField(`Missions: [${npcFile.missionsList.length}]`, missionInfo, false)
        }
        var vendorInfo = ``
        let count = 1
        if(npcFile.isVendor === 1){
            for (let e = 0; e < Object.keys(npcFile?.LootTables).length; e++) {
                for (let j = 0; j < Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items).length; j++) {

                    vendorInfo = `${vendorInfo}**${count}.** ${npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items[Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]].displayName} [${Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]}]\n`
                    count++
                }
            }
        }
        // console.log(Object.keys(npcFile.missions).length)
        // console.log(length)
        // if(npcFile.isVendor === 1){
        //     embed.addField(`Sells:`, vendorInfo, false)
        // }
        if(npcFile.isVendor === 1){
            embed.addField(`Sells: [${npcFile.totalItemsSold}]`, vendorInfo, false)
        }




        //message.channel.send(`\`\`\`json\n${JSON.stringify(npcFile,null, 2)}\`\`\``)

        message.channel.send(embed)


    }
}
