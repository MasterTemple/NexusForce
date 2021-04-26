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


        const {invisChar, emojis} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        try{
            var uIcon = skillToCDGFile[skillID]['iconURL']
        }catch(e) {
            console.log(e)
            var uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"
        }
        let desc = ``
        if(skillToCDGFile[skillID]['Description'] !== undefined){
            desc = `${desc}**${skillToCDGFile[skillID]['Description']}**\n`
        }
        if(skillToCDGFile[skillID]['cdg'] !== undefined){
            desc = `${desc}Cooldown Group: **${skillToCDGFile[skillID]['cdg']}**\n`
        }
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


        if(skillToCDGFile[skillID]['damageCombo'] !== undefined){
            desc = `${desc}Damage Combo: **${skillToCDGFile[skillID]['damageCombo']}**\n`
        }
        if(skillToCDGFile[skillID]['ChargeUp'] !== undefined){
            desc = `${desc}ChargeUp: **${skillToCDGFile[skillID]['ChargeUp']}**\n`
        }


        let embed = msgEmbed.execute(`${skillName}: ${skillID} `, desc,`https://lu-explorer.web.app/skills/${skillID}`, uIcon)
        message.channel.send(embed)

    }
}
