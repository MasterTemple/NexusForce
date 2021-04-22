module.exports = {
    name: ['kit'],
    description: 'Get information about a kit in LEGO Universe',
    args: true,
    use: `kit [id]`,
    example: [`kit engineer 3`],
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
        const {emojis, invisChar} = require('./../config.json');

        var kitFile = require(`./../output/kitData/${kitID}.json`)

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let embed = msgEmbed.execute(kitFile.name, undefined,`https://lu-explorer.web.app/objects/item-sets/${kitFile.id}`, kitFile.iconURL)



        // if(Object.keys(kitFile?.skillIDs)?.length > 0){
        //     for (let e = 0; e < Object.keys(kitFile?.skillIDs).length; e++) {
        //         let kitInfo = `Imagination Cost: **${kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]].imaginationCost}**\nCooldown Time: **${kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]].cooldownTime}**\n`
        //         //console.log(e)
        //         try {
        //             for (let j = 0; j < Object.keys(kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]].items).length; j++) {
        //                 //console.log(kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]])
        //                 kitInfo = `${kitInfo}__${kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]]['items'][Object.keys(kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]].items)[j]].displayName}__ [${Object.keys(kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]].items)[j]}]\n`
        //             }
        //             if(Object.keys(kitFile.skillIDs[Object.keys(kitFile?.skillIDs)[e]].items).length > 0) {
        //                 embed.addField(`Skill ID: ${Object.keys(kitFile?.skillIDs)[e]}`, kitInfo, true)
        //             }
        //
        //         }catch{
        //             //console.log(`e`)
        //
        //         }
        //         //console.log(kitInfo)
        //
        //
        //     }
        // }
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
