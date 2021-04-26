module.exports = {
    name: ['lti', 'loottableindex', 'loottable'],
    description: 'Get the items in a LootTableIndex',
    args: true,
    use: `lti [name or ID]`,
    example: ['lti GF Rares', `lti 104`],
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
        if((args.length > 1 || isNaN(args[0])) && args[1] !== 'dm' ){
            let findOne = require(`./../functions/findOneLTI.js`)
            var itemID = findOne.execute(args)
            if(itemID===undefined){
                message.channel.send("A Loot Table with this Name or Alternate Name does not exist.")
                //err()
                return
            }
        }else{
            var itemID = args[0]
        }

        // const itemID = id
        const item = require(`./../output/lootTableIndexes/${itemID}.json`);





        // message.channel.send(itemID)
        // return
        const {invisChar} = require('./../config.json');

        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"
        let msgEmbed = require(`./../functions/embedTemplate.js`)

        if(item.nameInfo.Name){
            var ltiName = item.nameInfo.Name
        }else{
            var ltiName = item.nameInfo.AlternateName

        }
        let total = 0
        Object.keys(item.rarityCount).forEach(function(count){
            total = total + item.rarityCount[count]
        })

        let embed = msgEmbed.execute(`${ltiName} [${item.nameInfo.LootTableIndex}] - ${total} Items `, undefined, `https://lu-explorer.web.app/objects/loot/table/${itemID}`, uIcon)

        Object.keys(item.byRarity).forEach(function(el) {
            let desc1 = ``
            let desc2 = ``

            item.byRarity[el].forEach(function(itemIDFromRarity, key){
                if(key % 2 === 0) {
                    desc1 = `${desc1} ${item.items[itemIDFromRarity]['displayName']} [${itemIDFromRarity}]\n`
                }else{
                    desc2 = `${desc2} ${item.items[itemIDFromRarity]['displayName']} [${itemIDFromRarity}]\n`
                }
            })
            if(desc1 !== '') {

                embed.addField(invisChar, `**Tier ${el} Items (${item.byRarity[el].length} Total)**:`, false)
                embed.addField(invisChar, desc1, true)
                if(desc2 !== '') {
                    embed.addField(invisChar, desc2, true)
                }

            }
        })

        try {
            if(args[1] !== 'dm') {
                message.channel.send(embed)
            }else if(args[1] === 'dm'){
                message.author.send(embed)
            }
        }catch{
            err()
        }
    }
}
