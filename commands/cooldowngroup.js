module.exports = {
    name: ['group', 'cooldowngroup'],
    description: 'See where to npc an item',
    args: true,
    use: `group [id]`,
    example: [`group 7570`],
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
            message.channel.send("This is not a valid cooldown groups.")
            err()
            return
        }else{
            var groupID = args[0]
        }
        var groupFile = require(`./../output/cooldowngroup/${groupID}.json`)

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let embed = msgEmbed.execute(`Cooldown Group ${groupID}`, undefined,`https://lu-explorer.web.app/objects/${groupFile.groupID}`, uIcon)



        if(Object.keys(groupFile.skillIDs).length > 0){
            for (let e = 0; e < Object.keys(groupFile?.skillIDs).length; e++) {
                let groupInfo = `Imagination Cost: **${groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]].imaginationCost}**\nCooldown Time: **${groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]].cooldownTime}**\n`
                //console.log(e)
                try {
                    for (let j = 0; j < Object.keys(groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]].items).length; j++) {
                        //console.log(groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]])
                        groupInfo = `${groupInfo}__${groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]]['items'][Object.keys(groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]].items)[j]].displayName}__ [${Object.keys(groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]].items)[j]}]\n`
                    }
                    if(Object.keys(groupFile.skillIDs[Object.keys(groupFile?.skillIDs)[e]].items).length > 0) {
                        embed.addField(`Skill ID: ${Object.keys(groupFile?.skillIDs)[e]}`, groupInfo, true)
                    }

                }catch{
                    //console.log(`e`)

                }
                //console.log(groupInfo)


            }
        }

        // if(Object.keys(groupFile?.missions).length > 0){
        //     embed.addField(`Missions: [${groupFile.missionsList.length}]`, groupInfo, false)
        // }

        // var vendorInfo = ``
        // let count = 1
        // if(groupFile.isVendor === 1){
        //     for (let e = 0; e < Object.keys(groupFile?.LootTables).length; e++) {
        //         for (let j = 0; j < Object.keys(groupFile.LootTables[Object.keys(groupFile?.LootTables)[e]].items).length; j++) {
        //
        //             vendorInfo = `${vendorInfo}**${count}.** ${groupFile.LootTables[Object.keys(groupFile?.LootTables)[e]].items[Object.keys(groupFile.LootTables[Object.keys(groupFile?.LootTables)[e]].items)[j]].displayName} [${Object.keys(groupFile.LootTables[Object.keys(groupFile?.LootTables)[e]].items)[j]}]\n`
        //             count++
        //         }
        //     }
        // }
        // // console.log(Object.keys(groupFile.missions).length)
        // // console.log(length)
        // // if(groupFile.isVendor === 1){
        // //     embed.addField(`Sells:`, vendorInfo, false)
        // // }
        // if(groupFile.isVendor === 1){
        //     embed.addField(`Sells: [${groupFile.totalItemsSold}]`, vendorInfo, false)
        // }

        message.channel.send(embed)


    }
}
