module.exports = {
    name: ['enemy', 'maelstrom'],
    description: 'See stats about an enemy',
    args: true,
    use: `enemy [id]`,
    example: [`enemy GF admiral`, `enemy 6789`],
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
            let findOne = require(`./../functions/findOneEnemy.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An enemy with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        // message.reply(objectID)
        // return
        var enemyFile = require(`./../output/enemies/${objectID}.json`)
        //enemyFile = require('./../output/references')
        //console.log(enemyFile)
        //console.log(enemyFile)
        let msgEmbed = require(`./../functions/embedTemplate.js`)

        var description
        const { uIcon, luExplorerURL, resURL, unknownImageURL, emojis, invisChar} = require('./../config.json')
        let c = 0
        let wasDMed = false
        let img
        if(enemyFile.iconURL !== "uIcon" || enemyFile.iconUFL !== "unknown"){
            img = `${resURL}${enemyFile.iconURL}`
        }else if(enemyFile.iconURL !== "unknown"){
            img = unknownImageURL
        }else{
            img = uIcon
        }


        let embed = msgEmbed.execute(`${enemyFile.itemInfo.displayName} [${enemyFile.objectID}]`, description,`${luExplorerURL}objects/${enemyFile.objectID}`, img)
        let hpString = `**${enemyFile.itemInfo.life}** ${emojis.heart}`
        if(enemyFile.itemInfo.armor !== 0){
            hpString = `${hpString}  **${enemyFile.itemInfo.armor}** ${emojis.armor}`
        }

        embed.addFields(
            { name: 'Name', value: enemyFile.itemInfo.name, inline: true },
            { name: 'Description', value: enemyFile.itemInfo.description, inline: true },
            { name: 'Health', value: hpString, inline: true },
        )
        Object.keys(enemyFile.overview).forEach(function (el, key){
            let subHeader = invisChar
            // if()
            let arr = []
            let ranged = false
            for(let i=0;i<enemyFile.overview[el].attackTypes.length;i++){
                if(arr.includes(enemyFile.overview[el].attackTypes[i]) === false && enemyFile.overview[el].attackTypes[i] !== "Ranged"){
                    arr.push(enemyFile.overview[el].attackTypes[i])
                }
                if(enemyFile.overview[el].attackTypes[i] === "Ranged"){
                    ranged = true
                }
            }

            if(ranged){
                subHeader = "Projectile Attack"
            }else{
                subHeader = "Melee Attack"
            }

            embed.addField(invisChar, `**Attack ${key+1}**`, false)
            embed.addField(subHeader, `Damage: **${enemyFile.overview[el].damage[0]}**\nCooldown: **${enemyFile.overview[el].cooldown}** Seconds`, true)
            if(enemyFile.overview[el].attackTypes.length === 1) {
                embed.addField("Attack Type", `${arr.join('\n')}`, true)
            }
            if(enemyFile.overview[el].attackTypes.length > 1) {
                embed.addField("Attack Types", `${arr.join('\n')}`, true)
            }

        })

        message.channel.send(embed)

    }
}
