module.exports = {
    name: ['skill'],
    description: 'Get all objects by its skill in LEGO Universe',
    args: true,
    use: `skill [name or ID]`,
    example: [`skill 550`, `skill Ronin Rush`],
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
            let findOne = require(`./../functions/findOneSkill.js`)
            var skillID = findOne.execute(args)
            if(skillID===undefined){
                message.channel.send("A Skill with this Name does not exist.")
                //err()
                return
            }
        }else{
            var skillID = args[0]
        }

        try {
            let skillToCDGFile = require(`./../output/references/Skills.json`)
            try{
                var skillName = skillToCDGFile[`${skillID}`]['name']
            }catch{
                var skillName = `SkillID`
            }
            let cooldowngroup = skillToCDGFile[`${skillID}`]['cdg']
            let CDGFile = require(`./../output/cooldowngroup/${cooldowngroup}.json`)
            var skillData = CDGFile['skillIDs'][`${skillID}`]

        }catch(e){
            console.log(e)
            message.channel.send("A skill with this skillID does not exist.")
            err()
            return
        }
        //console.log(skillData)
        //return


        const {invisChar, emojis} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let desc = ``

        if(skillData.imaginationCost !== null && skillData.cooldownTime !== null){
            desc = `${desc}Imagination Cost: **${skillData.imaginationCost}** ${emojis.imagination}\nCooldown Time: **${skillData.cooldownTime}** Seconds\n`
        }
        if(skillData.imBonusUI !== null){
            desc = `${desc}Bonus: **${skillData.imBonusUI}** ${emojis.imagination}\n`
        }
        if(skillData.armorBonusUI !== null){
            desc = `${desc}Bonus: **${skillData.armorBonusUI}** ${emojis.armor}\n`
        }
        if(skillData.lifeBonusUI !== null){
            desc = `${desc}Bonus: **${skillData.lifeBonusUI}** ${emojis.heart}\n`
        }

        let embedArray = []

        let field1 = ''
        let field2 = ''
        let side = 0
        let total = 0
        Object.keys(skillData.items).forEach(function(element, key, _array){
            if(skillData.items[element].displayName !== undefined || skillData.items[element].name !== undefined) {
                let name
                if(skillData.items[element].displayName === ""){
                    name = skillData.items[element].name
                }else{
                    name = skillData.items[element].displayName
                }

                if (side % 2 === 0) {
                    field1 = `${field1}**${name}** [${element}]\n`
                } else {
                    field2 = `${field2}**${name}** [${element}]\n`
                }
                side++
            }
            total++
            if(field1.length > 950 || field2.length > 950){
                embedArray.push({
                    "field1": field1,
                    "field2": field2,
                })
                field1 = ''
                field2 = ''
                side = 0
            }
            if(Object.keys(skillData.items).length === total){
                embedArray.push({
                    "field1": field1,
                    "field2": field2,
                })
            }
        })
        let num = 1
        embedArray.forEach(function(e){

            let embed = msgEmbed.execute(`${skillName}: ${skillID} (${num})`, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)

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
