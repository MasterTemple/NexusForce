module.exports = {
    name: ['skillitem', 'skillitems'],
    description: 'Get all objects by its skill in LEGO Universe',
    args: true,
    use: `skillitems [name or ID]`,
    example: [`skillitems 550`, `skill Ronin Rush`],
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
            var skillToCDGFile = require(`./../output/references/Skills.json`)
            try{
                var skillName = skillToCDGFile[skillID]['name']
            }catch{
                var skillName = `SkillID`
            }
            let cooldowngroup = skillToCDGFile[skillID]['cdg']
            let CDGFile = require(`./../output/cooldowngroup/${cooldowngroup}.json`)
            var skillData = CDGFile['skillIDs'][skillID]

        }catch(e){
            console.log(e)
            message.channel.send("A skill with this skillID does not exist.")
            err()
            return
        }
        //console.log(skillData)
        //return


        const { uIcon, luExplorerURL, resURL, unknownImageURL, invisChar} = require('./../config.json')

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        try{
            var icon = skillToCDGFile[skillID]['iconURL']
        }catch(e) {
            console.log(e)
            var icon = uIcon
        }
        // let desc = ``
        // if(skillToCDGFile[skillID]['cdg'] !== undefined){
        //     desc = `${desc}Cooldown Group: **${skillToCDGFile[skillID]['cdg']}**\n`
        // }
        // if(skillData.imaginationCost !== null && skillData.cooldownTime !== null){
        //     desc = `${desc}Imagination Cost: **${skillData.imaginationCost}** ${emojis.imagination}\nCooldown Time: **${skillData.cooldownTime}** Seconds\n`
        // }
        // if(skillData.imBonusUI !== null){
        //     desc = `${desc}Bonus: **${skillData.imBonusUI}** ${emojis.imagination}\n`
        // }
        // if(skillData.armorBonusUI !== null){
        //     desc = `${desc}Bonus: **${skillData.armorBonusUI}** ${emojis.armor}\n`
        // }
        // if(skillData.lifeBonusUI !== null){
        //     desc = `${desc}Bonus: **${skillData.lifeBonusUI}** ${emojis.heart}\n`
        // }
        //
        //
        // if(skillToCDGFile[skillID]['damageCombo'] !== undefined){
        //     desc = `${desc}Damage Combo: **${skillToCDGFile[skillID]['damageCombo']}**\n`
        // }
        // if(skillToCDGFile[skillID]['ChargeUp'] !== undefined){
        //     desc = `${desc}ChargeUp: **${skillToCDGFile[skillID]['ChargeUp']}**\n`
        // }
        //
        // if(skillToCDGFile[skillID]['Description'] !== undefined){
        //     desc = `${desc}**Description: **${skillToCDGFile[skillID]['Description']}\n`
        // }

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
                    field1 = `${field1}**${name}** [[${element}]](${luExplorerURL}objects/${element})\n`
                } else {
                    field2 = `${field2}**${name}** [[${element}]](${luExplorerURL}objects/${element})\n`
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

            let embed = msgEmbed.execute(`${skillName}: ${skillID} (${num})`, undefined,`${luExplorerURL}skills/${skillID}`, uIcon)

            embed.addField("Items:", e.field1, true)
            if(e.field2 === ''){
                e.field2 = invisChar
            }
            embed.addField(invisChar, e.field2, true)

            if(embedArray.length === 1 && e.field1.length < 512){
                message.channel.send(embed)
            }else {
                message.author.send(embed)
				message.channel.send("Direct Message Sent!")
            }
            num++
        })
        if(embedArray.length > 1){
            message.channel.send("Direct Messages Sent!")

        }else{
			

		}

    }
}
