module.exports = {
    name: ['earn'],
    description: 'See where to earn an item',
    args: true,
    use: `earn [id]`,
    example: [`earn 7570`],
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
            let findOne = require(`./../functions/findOneObject.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        var earnFile = require(`./../json/Drops/EarnFromMission/${Math.floor(objectID/256)}/${objectID}.json`)

        //let embed = msgEmbed.execute(earnFile.displayName, undefined,`https://lu-explorer.web.app/objects/${earnFile.itemID}`, earnFile.iconURL)
        let embed = msgEmbed.execute(`${earnFile.displayName} [${earnFile.itemID}]`, undefined,`https://lu-explorer.web.app/objects/${earnFile.itemID}`, earnFile.iconURL)


        if(earnFile.table.length !== 0){
            console.log(earnFile)
            for(var k=0;k<earnFile.table.length;k++){
                embed.addField(earnFile.table[k].name, earnFile.table[k].objective, false)
            }

            //message.channel.send(`\`\`\`json\n${JSON.stringify(earnFile,null, 2)}\`\`\``)

        }else{
            //console.log(`You cannot earn this item. Try !buy to see where you can buy this item or !drop to see where this item drops.`)
            //message.channel.send(`>>> You cannot earn this item.\nTry one of the following:\n!buy to see where you can buy this item\n!drop to see where this item drops.`)
            embed.addField(`This Item Is Not Earned!`, "Try **!buy** or **!drop** to see how to unlock this item!", false)

        }
        message.channel.send(embed)




    }
}
