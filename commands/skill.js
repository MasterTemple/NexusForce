module.exports = {
    name: ['skill'],
    description: 'Get information about a skill in LEGO Universe',
    args: true,
    use: `skill [id]`,
    example: [`skill 550`],
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

        const skillID = args[0]
        try {
            let skillToCDGFile = require(`./../output/references/Skills.json`)
            let cooldowngroup = skillToCDGFile[`${skillID}`]
            let CDGFile = require(`./../output/cooldowngroup/${cooldowngroup}.json`)
            var CDGData = CDGFile['skillIDs'][`${skillID}`]

        }catch(e){
            //console.log(e)
            message.channel.send("A skill with this skillID does not exist.")
            err()
            return
        }
        //console.log(CDGData)
        //return


        const {emojis, invisChar} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let desc = `Imagination Cost: **${CDGData.imaginationCost}**\nCooldown Time: **${CDGData.cooldownTime}** Seconds`
        let embed = msgEmbed.execute(`SkillID: ${skillID}`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)

        let embedData1 = ``
        let embedData2 = ``
        let embedData3 = ``
        let embedData4 = ``
        let embedData5 = ``
        let embedData6 = ``
        let counter = 0
        let e1 = 0
        let e2 = 0
        let notTooLong = true
        Object.keys(CDGData.items).forEach(function(element, key, _array){
            //console.log(element, CDGData.items[element])
            //embed.addField(CDGData.items[element].displayName, `${CDGData.items[element].name} [${element}]`, false)
            //if(notTooLong)
            if(Object.keys(CDGData.items).length / 2 >= counter){
                if(`${embedData1}**${CDGData.items[element].displayName}** [${element}]\n`.length < 1000) {
                    embedData1 = `${embedData1}**${CDGData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData3}**${CDGData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData3 = `${embedData3}**${CDGData.items[element].displayName}** [${element}]\n`
                } else{
                    embedData5 = `${embedData5}**${CDGData.items[element].displayName}** [${element}]\n`

                }

                e1++
            }
            if(Object.keys(CDGData.items).length / 2 < counter){
                //embedData2 = `${embedData2}**${CDGData.items[element].displayName}** [${element}]\n`

                if(`${embedData2}**${CDGData.items[element].displayName}** [${element}]\n`.length < 1000) {
                    embedData2 = `${embedData2}**${CDGData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData4}**${CDGData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData4 = `${embedData4}**${CDGData.items[element].displayName}** [${element}]\n`
                }else{
                    embedData6 = `${embedData6}**${CDGData.items[element].displayName}** [${element}]\n`

                }

                e2++
            }
            counter++
        })
        //console.log(counter)
        console.log(e1)
        console.log(e2)

        // console.log(embedData1)
        // console.log(embedData2)
        // console.log(embedData3)
        // console.log(embedData4)

        embed.addField("Items:", embedData1, true)
        embed.addField(invisChar, embedData2, true)

        if(embedData3 && embedData4) {
            embed.addField(invisChar, '**More Items:**', false)
            embed.addField(invisChar, embedData3, true)
            embed.addField(invisChar, embedData4, true)
        }
        if(embedData5 && embedData6) {
            embed.addField(invisChar, '**More Items:**', false)
            embed.addField(invisChar, embedData5, true)
            embed.addField(invisChar, embedData6, true)
        }


        // if(Object.keys(CDGData.totalWithoutValiant).length !== 0 && Object.keys(CDGData.totalWithValiant).length === 0) {
        //     //embed.addField("Total", "With Valiant")
        //     embed.addFields(
        //         {name: `${emojis.armor} Armor`, value: CDGData?.totalWithoutValiant?.armorBonusUI, inline: true},
        //         {name: `${emojis.heart} Health`, value: CDGData?.totalWithoutValiant?.lifeBonusUI, inline: true},
        //         {
        //             name: `${emojis.imagination} Imagination`,
        //             value: CDGData?.totalWithoutValiant?.imBonusUI,
        //             inline: true
        //         },
        //     )
        // }


        try {
            message.channel.send(embed)
        }catch{
            err()
        }


    }
}
