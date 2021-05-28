module.exports = {
    name: ['npc'],
    description: 'Get information about an NPC',
    args: true,
    use: `npc [id]`,
    example: ['npc sky lane', `npc 5997`],
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
            let findOne = require(`./../functions/findOneNPC.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An NPC with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var npcFile = require(`./../output/npcs/${Math.floor(objectID/256)}/${objectID}.json`)

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let img
        const { uIcon, luExplorerURL, resURL, unknownImageURL, invisChar} = require('./../config.json')
        if(npcFile.iconURL !== "uIcon" || npcFile.iconUFL !== "unknown" && npcFile.iconURL.includes('http') === false){
            img = `${resURL}${npcFile.iconURL}`
        }else if(npcFile.iconURL === "unknown"){
            img = unknownImageURL
        }else if(npcFile.iconURL.includes('http')){
            img = npcFile.iconURL
        }else{
            img = uIcon
        }

        let embed = msgEmbed.execute(`${npcFile.itemInfo.displayName} [${npcFile.objectID}]`, undefined,`${luExplorerURL}objects/${npcFile.objectID}/73`, img)


        let missionInfo = ``
        let missionInfoArray = []
        var tooLong = false
        var missionCount = 0
        let missionLength = Object.keys(npcFile?.missions).length
        if(npcFile.isMissionGiver === 1){
            for (let e = 0; e < missionLength; e++) {
                //console.log(e)
                // try {
                    let missionDescription = npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.description
                    var descriptionArray = missionDescription.split(`<`)
                    for(var i=0;i<descriptionArray.length-1;i++){
                        missionDescription = missionDescription.replace(/<[^>]*>/, '')
                    }
                    // missionDescription = missionDescription.replaceAll(/<[^>]*>/, '')
                    if(missionInfo.length + `${missionInfo}**${e + 1}.** __${npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.name}__ [[${Object.keys(npcFile?.missions)[e]}]](${luExplorerURL}missions/${Object.keys(npcFile?.missions)[e]})\n`.length + missionDescription.length >= 1024){
                        tooLong = true
                    }
                    // console.log(`${e}, M1:${missionInfo?.length}+${missionDescription?.length}=${missionInfo.length + missionDescription.length} => ${tooLong}`)
                    // console.log(`${e}, M2:${missionInfo2?.length}+${missionDescription?.length}=${missionInfo2.length + missionDescription.length} => ${tooLong}`)
                    //console.log(`${missionInfo}**${e + 1}.** __${npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.name}__ [[${Object.keys(npcFile?.missions)[e]}]](${luExplorerURL}missions/${Object.keys(npcFile?.missions)[e]})\n${missionDescription}\n`)
                    if(tooLong){
                        missionInfoArray.push(missionInfo)
                        missionInfo = ''
                        tooLong = false
                        missionInfo = `${missionInfo}**${e + 1}.** __${npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.name}__ [[${Object.keys(npcFile?.missions)[e]}]](${luExplorerURL}missions/${Object.keys(npcFile?.missions)[e]})\n`
                        missionInfo = `${missionInfo}${missionDescription}\n`
                        missionCount++
                    }else{
                        missionInfo = `${missionInfo}**${e + 1}.** __${npcFile.missions[Object.keys(npcFile?.missions)[e]].MissionStats.MissionText.name}__ [[${Object.keys(npcFile?.missions)[e]}]](${luExplorerURL}missions/${Object.keys(npcFile?.missions)[e]})\n`
                        missionInfo = `${missionInfo}${missionDescription}\n`
                        missionCount++

                    }
                    if(e === missionLength-1){
                        missionInfoArray.push(missionInfo)
                    }
                // }catch{}
                //console.log(missionInfo)


            }
        }

        // if(Object.keys(npcFile?.missions).length > 0){
        //     embed.addField(`Missions: [${npcFile.missionsList.length}]`, missionInfo, false)
        // }
        missionInfoArray.forEach(function(element, index){
            if(index === 0){
                embed.addField(`Missions: [${missionCount}]`, element, false)
            }else{
                embed.addField('Extended:', element, false)

            }
        })

        // if(missionInfo2.length !== 0){
        //     embed.addField('Extended:', missionInfo2, false)
        // }
        var vendorInfo = ``
        var vendorInfo1 = ``
        var vendorInfo2 = ``
        let count = 1
        if(npcFile.isVendor === 1){
            for (let e = 0; e < Object.keys(npcFile?.LootTables).length; e++) {
                for (let j = 0; j < Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items).length; j++) {
                    if(count % 2 !== 0){
                        vendorInfo1 = `${vendorInfo1}**${count}.** ${npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items[Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]].displayName} [[${Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]}]](${luExplorerURL}objects/${Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]})\n`
                    }else{
                        vendorInfo2 = `${vendorInfo2}**${count}.** ${npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items[Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]].displayName} [[${Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]}]](${luExplorerURL}objects/${Object.keys(npcFile.LootTables[Object.keys(npcFile?.LootTables)[e]].items)[j]})\n`
                    }
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
            embed.addField(`Sells: [${npcFile.totalItemsSold}]`, vendorInfo1, true)
            embed.addField(invisChar, vendorInfo2, true)
        }




        //message.channel.send(`\`\`\`json\n${JSON.stringify(npcFile,null, 2)}\`\`\``)
        //console.log(`${JSON.stringify(embed, null, 2)}`)
        // embed.fields.forEach(function(e){
        //     console.log(e.name, e.value.length)
        // })
        try {
            message.channel.send(embed)
        }catch{
            err()
        }

    }
}
