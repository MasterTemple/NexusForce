module.exports = {
    name: ['earn'],
    description: 'See where to earn an item',
    args: true,
    use: `earn [name or ID]`,
    example: ['earn blue parrot', `earn 6792`],
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
            let findOne = require(`./../functions/fineOneBrickOrItem.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An item with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var earnFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')

        //earnFile = require('./../output/references')
        //console.log(earnFile)
        //console.log(earnFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(earnFile.itemComponent.levelRequirement === undefined){
            earnFile.levelRequirement = 0
        }
        let earnKey = Object.keys(earnFile.earn)

        let earnLen = earnKey.length

        let img = `${resURL}${earnFile.iconURL}`

        if(earnLen < 2){
            var description = `You can earn this item **${earnLen}** times`
        }

        //let embed = msgEmbed.execute(earnFile.displayName, undefined,`${luExplorerURL}objects/${earnFile.objectID}`, earnFile.iconURL)
        let embed = msgEmbed.execute(`${earnFile.itemInfo.displayName} [${earnFile.objectID}]`, description,`${luExplorerURL}objects/${earnFile.objectID}`, img)



        var earnInfo = ``
        let wasDMed = false
        for(var e=0;e<earnKey.length;e++){
            //console.log([earnKey])
            console.log(earnKey[e])
            // console.log([earnKey][e])
            // console.log(earnFile.earn[earnKey[e]])
            //earnInfo = `${earnInfo}${earnFile.earn[earnKey]['defined_type']} > ${earnFile.earn[earnKey]['defined_subtype']} > ${earnFile.earn[earnKey]['missionName']}\n${earnFile.earn[earnKey]['missionDescription']}\n`
            if(earnFile?.earn[earnKey[e]]?.rewardCount === 1) {
                embed.addField(`${earnFile.earn[earnKey[e]]['defined_type']} > ${earnFile.earn[earnKey[e]]['defined_subtype']} > ${earnFile.earn[earnKey[e]]['missionName']}`, `${earnFile.earn[earnKey[e]]['missionDescription']} [[${earnKey[e]}]](${luExplorerURL}missions/${earnKey[e]})`, false)
            }else{
                embed.addField(`${earnFile.earn[earnKey[e]]['defined_type']} > ${earnFile.earn[earnKey[e]]['defined_subtype']} > ${earnFile.earn[earnKey[e]]['missionName']}`, `${earnFile.earn[earnKey[e]]['missionDescription']} [Gives ${earnFile.earn[earnKey[e]]['rewardCount']}] [[${earnKey[e]}]](${luExplorerURL}missions/${earnKey[e]})`, false)

            }
            if(embed.fields.length > 25){
                message.author.send(embed)
                embed = msgEmbed.execute(`${earnFile.itemInfo.displayName} [${earnFile.objectID}]`, undefined,`${luExplorerURL}objects/${earnFile.objectID}`, img)
                wasDMed = true
            }

            if(e === earnKey.length-1 && embed.fields.length !== 0 && wasDMed){
                message.author.send(embed)
                message.channel.send("Direct Messages Sent!")
                //embed = msgEmbed.execute(`${earnFile.itemInfo.displayName} [${earnFile.objectID}]`, undefined,`${luExplorerURL}objects/${earnFile.objectID}`, earnFile.iconURL)
            }else if(e === earnKey.length-1 && embed.fields.length !== 0){
                message.channel.send(embed)
            }


        }

        if(earnKey.length === 0){
            embed.addField(`This Item Is Not Earned!`, "Try **!buy** or **!drop** to see how to unlock this item!", false)
            message.channel.send(embed)

        }



        //message.channel.send(`\`\`\`json\n${JSON.stringify(earnFile,null, 2)}\`\`\``)

        try {
        }catch{
            err()
        }

    }
}
