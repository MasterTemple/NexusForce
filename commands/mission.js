module.exports = {
    name: ['mission', 'achievement'],
    description: 'Get information/rewards of a mission or achievement',
    args: true,
    use: `mission [id]`,
    example: [`mission 7570`],
    execute(message, args) {
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

        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneMission.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("A mission with this Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var missionFile = require(`./../json/MissionsAndAchievements/${Math.floor(objectID/256)}/${objectID}.json`)
        if(missionFile)
            console.log(missionFile)
        //message.channel.send(`\`\`\`json\n${JSON.stringify(missionFile,null, 2)}\`\`\``)
        let msgEmbed = require(`./../functions/embedTemplate.js`)

       // if(missionFile.isRepeatable === 0) {
       //      if (missionFile.description === undefined) {
       //          var embed = msgEmbed.execute(`${missionFile.title} [${objectID}]`, undefined, `https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)
       //      } else {
       //          var embed = msgEmbed.execute(`${missionFile.title} [${objectID}]`, missionFile.description, `https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)
       //      }
       //  }else{
       //     if (missionFile.description === undefined) {
       //         var embed = msgEmbed.execute(`${missionFile.title} (Repeatable) [${objectID}]`, undefined, `https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)
       //     } else {
       //         var embed = msgEmbed.execute(`${missionFile.title} (Repeatable) [${objectID}]`, missionFile.description, `https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)
       //     }
       // }
        if (missionFile.description === undefined) {
            missionFile.description = "None"
        }

        var embed = msgEmbed.execute(`${missionFile.title} [${objectID}]`, undefined, `https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)

        embed.addFields(
            {name: "Type", value: missionFile.type, inline: true},
            //{ name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },
            {name: "Objective", value: missionFile.objective, inline: true},
            {name: "Description", value: missionFile.description, inline: true},
        )
        if(missionFile.stats.length !== 0){

            for(var x = 0; x<missionFile.stats.length;x++){

                if(missionFile.stats[x].count === 1){
                    // embed.addFields(
                    //     //{name: missionFile.stats[0].statType, value: `${missionFile.stats[0].count} ${missionFile.stats[0].statName}`, inline: true}
                    //     {
                    //         name: `Stat Increase`,
                    //         value: `${missionFile.stats[x].count} ${missionFile.stats[x].statName}`,
                    //         inline: true
                    //     }
                    // )
                    embed.addField("Stat Increase", `${missionFile.stats[x].count} ${missionFile.stats[x].statName}`, false)

                } else if(missionFile.stats[x].count > 1){
                    // embed.addFields(
                    //     //{name: missionFile.stats[0].statType, value: `${missionFile.stats[0].count} ${missionFile.stats[0].statName}`, inline: true}
                    //     {
                    //         name: `Stat Increase`,
                    //         value: `${missionFile.stats[x].count} ${missionFile.stats[x].statName}s`,
                    //         inline: true
                    //     }
                    // )
                    embed.addField("Stat Increase", `${missionFile.stats[x].count} ${missionFile.stats[x].statName}s`, false)

                }
            }

        }


        if(missionFile.type === "Mission"){
            embed.addFields(
                {name: "Mission Giver", value: missionFile.giverName, inline: true},
                //{ name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },
                {name: "Return To", value: missionFile.returnToName, inline: true},
                { name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },

                //{name: "Repeatable", value: missionFile.isRepeatable, inline: true},
            )
        }

        if(missionFile.rewards.length !== 0){
            let description = ``
            for (var r = 0; r < missionFile.rewards.length; r++) {
                description = `${description} ${missionFile.rewards[r].name} [${missionFile.rewards[r].itemID}] x ${missionFile.rewards[r].count}\n`
            }

            if(missionFile.chooseOne === 1){
                embed.addField("Rewards (Choose One)", description, false)
            }else{
                embed.addField("Rewards", description, false)
            }


        }




        if(missionFile.isRepeatable === 0){
            missionFile.isRepeatable = false
        }
        if(missionFile.isRepeatable > 0){
            missionFile.isRepeatable = true
        }
        embed.addFields(
            {name: "LEGO Score", value: missionFile.LEGOScore, inline: true},
            {name: "Reward Coins", value: missionFile.rewardCoins, inline: true},
            {name: "Repeatable", value: missionFile.vaultSpace, inline: true},
        )


        //let embed = msgEmbed.execute(`${missionFile.title} [${objectID}]`, undefined,`https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)

        message.channel.send(embed)

    }
}
