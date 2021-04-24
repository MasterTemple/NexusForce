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

        let desc = `Imagination Cost: **${CDGData.imaginationCost}**\nCooldown Time: **${CDGData.cooldownTime}**`
        let embed = msgEmbed.execute(`SkillID: ${skillID}`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)

        Object.keys(CDGData.items).forEach(function(element, key, _array){
            console.log(element, CDGData.items[element])
            embed.addField(CDGData.items[element].displayName, `${CDGData.items[element].name} [${element}]`, false)
        })



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
