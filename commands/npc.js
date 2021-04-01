module.exports = {
    name: ['npc'],
    description: 'Get information on an NPC',
    args: true,
    use: `npc [id]`,
    example: [`npc 7570`],
    execute(message, args) {
        console.log(args)
        function err() {
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        if(args?.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneObject`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var npcFile = require(`./../json/NPC/${Math.floor(objectID/256)}/${objectID}.json`)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        console.log(npcFile)

        //let embed = msgEmbed.execute(npcFile.displayName, undefined,`https://lu-explorer.web.app/objects/${npcFile.objectID}`, npcFile.iconURL)
        let embed = msgEmbed.execute(`${npcFile.displayName} [${npcFile.objectID}]`, undefined,`https://lu-explorer.web.app/objects/${npcFile.objectID}`, npcFile.iconURL)

        if(npcFile.isMissionGiver){
            var missions = ``
            for(var e=0;e<npcFile.missionInfo?.length;e++){
                missions = `${missions}${npcFile.missionInfo[e].missionName} [**${npcFile.missionInfo[e].missionID}**]\n`
            }
            embed.addField(`Missions:`, missions, false)
        }
        if(npcFile.isVendor){
            var soldItems = ``
            for(var e=0;e<npcFile.soldItems?.length;e++){
                soldItems = `${soldItems}${npcFile.soldItems[e].soldItemIDName} [**${npcFile.soldItems[e].soldItemID}**]\n`
            }

            if(npcFile.soldItems?.length >= 1){
                embed.addField(`Sells:`, soldItems, false)
            }
        }

        message.channel.send(embed)



    }
}
