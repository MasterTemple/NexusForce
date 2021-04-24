module.exports = {
    name: ['cdg'],
    description: 'Get information about a cooldown group in LEGO Universe',
    args: true,
    use: `cdg [id]`,
    example: [`cdg 21`],
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

        const cdgID = args[0]
        message.channel.send(`This command is not ready.`)
        return
        try {
            var CDGFile = require(`./../output/cooldowngroup/${cooldowngroup}.json`)
        }catch(e){
            message.channel.send(`Cooldown Group ${args[0]} this does not exist.`)
            err()
            return
        }
        //console.log(skillData)
        //return


        const {invisChar} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let desc = ``

        // if(skillData.imaginationCost !== null && skillData.cooldownTime !== null){
        //     desc = `${desc}Imagination Cost: **${skillData.imaginationCost}**\nCooldown Time: **${skillData.cooldownTime}** Seconds\n`
        // }
        // if(skillData.imBonusUI !== null){
        //     desc = `${desc}Imagination Bonus: **${skillData.imBonusUI}**\n`
        // }
        // if(skillData.armorBonusUI !== null){
        //     desc = `${desc}Armor Bonus: **${skillData.armorBonusUI}**\n`
        // }
        // if(skillData.lifeBonusUI !== null){
        //     desc = `${desc}Life Bonus: **${skillData.lifeBonusUI}**\n`
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
            let embed = msgEmbed.execute(`SkillID: ${cdgID} (${num})`, desc,`https://lu-explorer.web.app/skills/${cdgID}`, uIcon)

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
