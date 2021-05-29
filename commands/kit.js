module.exports = {
    name: ['kit'],
    description: 'Get information about a kit in LEGO Universe',
    args: true,
    use: `kit [id]`,
    example: [`kit engineer 3`],
    execute(message, args, params) {
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
            let findOne = require(`./../functions/findOneKit.js`)
            var kitID = findOne.execute(args)
            if(kitID===undefined){
                message.channel.send("A kit with this Name does not exist.")
                err()
                return
            }
        }else{
            var kitID = args[0]
        }
        const { uIcon, luExplorerURL, resURL, unknownImageURL, invisChar, emojis} = require('./../config.json')

        var kitFile = require(`./../output/kitData/${kitID}.json`)

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        let embed = msgEmbed.execute(kitFile.name, undefined,`${luExplorerURL}objects/item-sets/${kitFile.id}`, kitFile.iconURL)

        Object.keys(kitFile.skillSetDescriptions).forEach(function(element, key, _array){
            embed.addField(`${element[element.length-1]} Piece Ability`, kitFile.skillSetDescriptions[element], false)
        })



        if(Object.keys(kitFile.totalWithoutValiant).length !== 0 && Object.keys(kitFile.totalWithValiant).length === 0) {
            //embed.addField("Total", "With Valiant")
            embed.addFields(
                {name: `${emojis.armor} Armor`, value: kitFile?.totalWithoutValiant?.armorBonusUI, inline: true},
                {name: `${emojis.heart} Health`, value: kitFile?.totalWithoutValiant?.lifeBonusUI, inline: true},
                {
                    name: `${emojis.imagination} Imagination`,
                    value: kitFile?.totalWithoutValiant?.imBonusUI,
                    inline: true
                },
            )
        }

        if(Object.keys(kitFile.totalWithoutValiant).length !== 0 && Object.keys(kitFile.totalWithValiant).length !== 0) {
            embed.addField(invisChar, "**Total Without Valiant**", false)
            embed.addFields(
                {name: `${emojis.armor} Armor`, value: kitFile?.totalWithoutValiant?.armorBonusUI, inline: true},
                {name: `${emojis.heart} Health`, value: kitFile?.totalWithoutValiant?.lifeBonusUI, inline: true},
                {
                    name: `${emojis.imagination} Imagination`,
                    value: kitFile?.totalWithoutValiant?.imBonusUI,
                    inline: true
                },
            )
        }
        if(Object.keys(kitFile.totalWithValiant).length !== 0) {
            embed.addField(invisChar, "**Total With Valiant**", false)
            embed.addFields(
                {name: `${emojis.armor} Armor`, value: kitFile?.totalWithValiant?.armorBonusUI, inline: true},
                {name: `${emojis.heart} Health`, value: kitFile?.totalWithValiant?.lifeBonusUI, inline: true},
                {name: `${emojis.imagination} Imagination`, value: kitFile?.totalWithValiant?.imBonusUI, inline: true},
            )
        }


        try {
            message.channel.send(embed)
        }catch{
            err()
        }


    }
}
