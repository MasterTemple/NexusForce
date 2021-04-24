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
            message.channel.send("A skill with this skillID does not exist.")
            err()
            return
        }
        //console.log(skillData)
        //return


        const {invisChar} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let desc = ``

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

        let embedArray = []

        let field1 = ''
        let field2 = ''
        let c = 0

        Object.keys(skillData.items).forEach(function(element, key, _array){
            if(c % 2 === 0) {
                field1 = `${field1}**${skillData.items[element].displayName}** [${element}]\n`
            }else{
                field2 = `${field2}**${skillData.items[element].displayName}** [${element}]\n`
            }

            c++
            if(field1.length > 950 || field2.length > 950){
                embedArray.push({
                    "field1": field1,
                    "field2": field2,
                })
                field1 = ''
                field2 = ''
            }
            if(Object.keys(skillData.items).length === c){
                embedArray.push({
                    "field1": field1,
                    "field2": field2,
                })
            }
        })
        let num = 1
        embedArray.forEach(function(e){
            let embed = msgEmbed.execute(`SkillID: ${skillID} (${num})`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)

            embed.addField("Items:", e.field1, true)
            if(e.field2 === ''){
                e.field2 = invisChar
            }
            embed.addField(invisChar, e.field2, true)
            if(embedArray.length === 1 && e.field1.length < 512){
                message.channel.send(embed)
            }else {
                message.author.send(embed)
            }
            num++
        })
        if(embedArray.length > 1){
            message.channel.send("Direct Messages Sent!")

        }

    }
}
