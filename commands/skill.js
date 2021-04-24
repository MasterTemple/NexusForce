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
            var skillData = CDGFile['skillIDs'][`${skillID}`]

        }catch(e){
            //console.log(e)
            message.channel.send("A skill with this skillID does not exist.")
            err()
            return
        }
        //console.log(skillData)
        //return


        const {emojis, invisChar} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let desc = ``
        //console.log(skillDatskillData.a)

        if(skillData.imaginationCost !== null && skillData.cooldownTime !== null){
            desc = `${desc}Imagination Cost: **${skillData.imaginationCost}**\nCooldown Time: **${skillData.cooldownTime}** Seconds\n`
        }
        if(skillData.imBonusUI !== null){
            desc = `${desc}Imagination Bonus: **${skillData.imBonusUI}**\n`
        }
        if(skillData.armorBonusUI !== null){
            desc = `${desc}Armor Bonus: **${skillData.armorBonusUI}**\n`
        }
        if(skillData.lifeBonusUI !== null){
            desc = `${desc}Life Bonus: **${skillData.lifeBonusUI}**\n`
        }

        let embed = msgEmbed.execute(`SkillID: ${skillID}`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)

        let embedData1 = ``
        let embedData2 = ``
        let embedData3 = ``
        let embedData4 = ``
        let embedData5 = ``
        let embedData6 = ``
        let embedData7 = ``
        let embedData8 = ``
        let counter = 0
        let e1 = 0
        let e2 = 0
        let notTooLong = true
        Object.keys(skillData.items).forEach(function(element, key, _array){
            //console.log(element, skillData.items[element])
            //embed.addField(skillData.items[element].displayName, `${skillData.items[element].name} [${element}]`, false)
            //if(notTooLong)
            if(Object.keys(skillData.items).length / 2 >= counter){
                if(`${embedData1}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000) {
                    embedData1 = `${embedData1}**${skillData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData3}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData3 = `${embedData3}**${skillData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData5}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData5 = `${embedData5}**${skillData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData7}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData7 = `${embedData5}**${skillData.items[element].displayName}** [${element}]\n`
                }

                e1++
            }
            if(Object.keys(skillData.items).length / 2 < counter){
                //embedData2 = `${embedData2}**${skillData.items[element].displayName}** [${element}]\n`

                if(`${embedData2}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000) {
                    embedData2 = `${embedData2}**${skillData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData4}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData4 = `${embedData4}**${skillData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData6}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData6 = `${embedData6}**${skillData.items[element].displayName}** [${element}]\n`
                }else if(`${embedData8}**${skillData.items[element].displayName}** [${element}]\n`.length < 1000){
                    embedData8 = `${embedData5}**${skillData.items[element].displayName}** [${element}]\n`
                }

                e2++
            }
            counter++
        })
        //console.log(counter)
        //console.log(e1)
        //console.log(e2)

        // console.log(embedData1)
        // console.log(embedData2)
        // console.log(embedData3)
        // console.log(embedData4)

        embed.addField("Items:", embedData1, true)
        if(embedData2) {
            embed.addField(invisChar, embedData2, true)
        }

        // if(embedData3 && embedData4) {
        //     embed.addField(invisChar, '**More Items:**', false)
        //     embed.addField(invisChar, embedData3, true)
        //     embed.addField(invisChar, embedData4, true)
        // }
        // if(embedData5 && embedData6) {
        //     embed.addField(invisChar, '**More Items:**', false)
        //     embed.addField(invisChar, embedData5, true)
        //     embed.addField(invisChar, embedData6, true)
        // }
        // if(embedData7 && embedData8) {
        //     embed.addField(invisChar, '**More Items:**', false)
        //     embed.addField(invisChar, embedData7, true)
        //     embed.addField(invisChar, embedData8, true)
        // }


        // if(Object.keys(skillData.totalWithoutValiant).length !== 0 && Object.keys(skillData.totalWithValiant).length === 0) {
        //     //embed.addField("Total", "With Valiant")
        //     embed.addFields(
        //         {name: `${emojis.armor} Armor`, value: skillData?.totalWithoutValiant?.armorBonusUI, inline: true},
        //         {name: `${emojis.heart} Health`, value: skillData?.totalWithoutValiant?.lifeBonusUI, inline: true},
        //         {
        //             name: `${emojis.imagination} Imagination`,
        //             value: skillData?.totalWithoutValiant?.imBonusUI,
        //             inline: true
        //         },
        //     )
        // }

        // console.log(`embedData1: ${embedData1}`)
        // console.log(`embedData2: ${embedData2}`)
        // console.log(`embedData3: ${embedData3}`)
        // console.log(`embedData4: ${embedData4}`)
        // console.log(`embedData5: ${embedData5}`)
        // console.log(`embedData6: ${embedData6}`)


        try {
            if(embedData3) {
                let embed1 = msgEmbed.execute(`SkillID: ${skillID} (1)`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
                let embed2 = msgEmbed.execute(`SkillID: ${skillID} (2)`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
                let embed3 = msgEmbed.execute(`SkillID: ${skillID} (3)`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
                let embed4 = msgEmbed.execute(`SkillID: ${skillID} (4)`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)

                if(embedData2) {
                    embed1.addField("Items:", embedData1, true)
                    embed1.addField(invisChar, embedData2, true)
                    message.author.send(embed1)
                }

                if(embedData3 && embedData4) {
                    embed2.addField("Items:", embedData3, true)
                    embed2.addField(invisChar, embedData4, true)
                    message.author.send(embed2)
                }
                if(embedData5 && embedData6) {
                    embed3.addField("Items:", embedData5, true)
                    embed3.addField(invisChar, embedData6, true)
                    message.author.send(embed3)
                }
                if(embedData5 && embedData6) {
                    embed4.addField("Items:", embedData7, true)
                    embed4.addField(invisChar, embedData8, true)
                    message.author.send(embed4)
                }


                // try{
                //     message.author.send(embed)
                //     message.channel.send("DM Sent.")
                // }catch{
                //     message.channel.send("Message Exceeds 6000 Characters")
                // }
            }else{
                message.channel.send(embed)
            }
        }catch{
            // let embed1 = msgEmbed.execute(`SkillID: ${skillID}`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
            // let embed2 = msgEmbed.execute(`SkillID: ${skillID}`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
            // let embed3 = msgEmbed.execute(`SkillID: ${skillID}`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
            // embed1.addField("Items:", embedData1, true)
            // if(embedData2) {
            //     embed1.addField(invisChar, embedData2, true)
            //     message.author.send(embed1)
            // }
            //
            // if(embedData3 && embedData4) {
            //     embed2.addField("Items:", embedData3, true)
            //     embed2.addField(invisChar, embedData4, true)
            //     message.author.send(embed2)
            // }
            // if(embedData5 && embedData6) {
            //     embed3.addField("Items:", embedData5, true)
            //     embed3.addField(invisChar, embedData6, true)
            //     message.author.send(embed3)
            // }
            // message.author.send(embed1)
            // message.author.send(embed2)
            // message.author.send(embed3)


            err()
        }


    }
}
