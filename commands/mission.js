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
        var missionFile = require(`./../output/missions/${objectID}.json`)
        //if(missionFile)
            //console.log(missionFile)
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

        var embed = msgEmbed.execute(`${missionFile.MissionStats.MissionText.name} [${objectID}]`, undefined, `https://lu-explorer.web.app/missions/${objectID}`, missionFile.MissionTasks.iconURL)

        if(missionFile.MissionStats.isMission == 0){
            var type = 'Achievement'
        }else{
            var type = "Mission"
        }

        embed.addFields(
            {name: type, value: `${missionFile.MissionStats.defined_type} > ${missionFile.MissionStats.defined_subtype} > ${missionFile.MissionStats.MissionText.name}`, inline: true},
            // //{ name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },
            // {name: "Objective", value: missionFile.objective, inline: true},
            // {name: "Description", value: missionFile.description, inline: true},
        )
        embed.addFields(
            {name: "Objective", value: missionFile.MissionStats.MissionText.description, inline: false},
        )
        // if(missionFile?.stats?.length !== 0){
        //
        //     for(var x = 0; x<missionFile.stats.length;x++){
        //
        //         if(missionFile.stats[x].count === 1){
        //             // embed.addFields(
        //             //     //{name: missionFile.stats[0].statType, value: `${missionFile.stats[0].count} ${missionFile.stats[0].statName}`, inline: true}
        //             //     {
        //             //         name: `Stat Increase`,
        //             //         value: `${missionFile.stats[x].count} ${missionFile.stats[x].statName}`,
        //             //         inline: true
        //             //     }
        //             // )
        //             embed.addField("Stat Increase", `${missionFile.stats[x].count} ${missionFile.stats[x].statName}`, false)
        //
        //         } else if(missionFile.stats[x].count > 1){
        //             // embed.addFields(
        //             //     //{name: missionFile.stats[0].statType, value: `${missionFile.stats[0].count} ${missionFile.stats[0].statName}`, inline: true}
        //             //     {
        //             //         name: `Stat Increase`,
        //             //         value: `${missionFile.stats[x].count} ${missionFile.stats[x].statName}s`,
        //             //         inline: true
        //             //     }
        //             // )
        //             embed.addField("Stat Increase", `${missionFile.stats[x].count} ${missionFile.stats[x].statName}s`, false)
        //
        //         }
        //     }
        //
        // }
        if(missionFile.MissionStats.reward_maximagination !== 0){
            embed.addField("Stat Reward", `**+${missionFile.MissionStats.reward_maximagination}** Imagination Point`, false)
        }
        if(missionFile.MissionStats.reward_maxhealth !== 0){
            embed.addField("Stat Reward", `**+${missionFile.MissionStats.reward_maxhealth}** Life Point`, false)
        }
        if(missionFile.MissionStats.reward_maxinventory !== 0 && missionFile.MissionStats.reward_maxinventory !== 1){
            embed.addField("Stat Reward", `**+${missionFile.MissionStats.reward_maxinventory}** Inventory Slots`, false)
        }else if(missionFile.MissionStats.reward_maxinventory === 1){
            embed.addField("Stat Reward", `**+${missionFile.MissionStats.reward_maxinventory}** Inventory Slot`, false)
        }
        if(missionFile.MissionStats.reward_bankinventory !== 0 && missionFile.MissionStats.reward_bankinventory !== null){
            embed.addField("Stat Reward", `**+${missionFile.MissionStats.reward_bankinventory}** Vault Slots`, false)
        }


        if(type === "Mission"){
            embed.addFields(
                {name: "Mission Giver", value: missionFile.NPCOfferName.displayName, inline: true},
                //{ name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },
                {name: "Return To", value: missionFile.NPCAcceptName.displayName, inline: true},
                { name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },

                //{name: "Repeatable", value: missionFile.isRepeatable, inline: true},
            )
        }

        var description = ``
        if(parseInt(missionFile.MissionStats.rewards.item1.reward_item1) !== -1){
            description = `${description} ${missionFile.MissionStats.rewards.item1.name} **x** ${missionFile.MissionStats.rewards.item1.reward_item1_count} [${missionFile.MissionStats.rewards.item1.reward_item1}]\n`
        }
        if(parseInt(missionFile.MissionStats.rewards.item2.reward_item2) !== -1){
            description = `${description} ${missionFile.MissionStats.rewards.item2.name} **x** ${missionFile.MissionStats.rewards.item2.reward_item2_count} [${missionFile.MissionStats.rewards.item2.reward_item2}]\n`
        }
        if(parseInt(missionFile.MissionStats.rewards.item3.reward_item3) !== -1){
            description = `${description} ${missionFile.MissionStats.rewards.item3.name} **x** ${missionFile.MissionStats.rewards.item3.reward_item3_count} [${missionFile.MissionStats.rewards.item3.reward_item3}]\n`
        }
        if(parseInt(missionFile.MissionStats.rewards.item4.reward_item4) !== -1){
            description = `${description} ${missionFile.MissionStats.rewards.item4.name} **x** ${missionFile.MissionStats.rewards.item4.reward_item4_count} [${missionFile.MissionStats.rewards.item4.reward_item4}]`
        }
        console.log(missionFile.MissionStats.rewards.item1.reward_item1)
        if(missionFile.MissionStats.isChoiceReward === 1 && missionFile.MissionStats.rewards.item1.reward_item1 !== -1){
            embed.addField("Rewards (Choose One)", description, false)
        }else if(missionFile.MissionStats.rewards.item1.reward_item1 !== -1){
            embed.addField("Rewards", description, false)
        }







        if(missionFile.isRepeatable === 0){
            missionFile.isRepeatable = false
        }
        if(missionFile.isRepeatable > 0){
            missionFile.isRepeatable = true
        }
        if(missionFile.MissionStats.LEGOScore === null || missionFile.MissionStats.LEGOScore === undefined){
            missionFile.MissionStats.LEGOScore = 0
        }
        if(missionFile.MissionStats.rewardCoins === null || missionFile.MissionStats.rewardCoins === undefined){
            missionFile.MissionStats.rewardCoins = 0
        }
        if(missionFile.MissionStats.reward_reputation === null || missionFile.MissionStats.reward_reputation === undefined){
            missionFile.MissionStats.reward_reputation = 0
        }
        embed.addFields(
            {name: "LEGO Score", value: missionFile.MissionStats.LEGOScore, inline: true},
            {name: "Reward Coins", value: missionFile.MissionStats.rewardCoins, inline: true},
            {name: "Reputation", value: missionFile.MissionStats.reward_reputation, inline: true},
        )


        //let embed = msgEmbed.execute(`${missionFile.title} [${objectID}]`, undefined,`https://lu-explorer.web.app/missions/${objectID}`, missionFile.iconurl)

        message.channel.send(embed)

    }
}
