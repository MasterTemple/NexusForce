module.exports = {
    name: ['cdg', 'group', 'cooldowngroup'],
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
        // message.channel.send(`This command is not ready.`)
        // return
        try {
            var CDGFile = require(`./../output/cooldowngroup/${cdgID}.json`)
        }catch(e){
            message.channel.send(`Cooldown Group ${cdgID} this does not exist.`)
            err()
            return
        }
        //console.log(CDGFile)
        //return


        const {invisChar} = require('./../config.json');

        let msgEmbed = require(`./../functions/embedTemplate.js`)
        let uIcon = "https://images-ext-1.discordapp.net/external/yeozIqZ6L5llPU2kUINa2Y5agdt4reO0KN1Q1YAjAOQ/%3Fcb%3D20121121213649/https/static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest"

        let desc = ``

        // if(CDGFile.imaginationCost !== null && CDGFile.cooldownTime !== null){
        //     desc = `${desc}Imagination Cost: **${CDGFile.imaginationCost}**\nCooldown Time: **${CDGFile.cooldownTime}** Seconds\n`
        // }
        // if(CDGFile.imBonusUI !== null){
        //     desc = `${desc}Imagination Bonus: **${CDGFile.imBonusUI}**\n`
        // }
        // if(CDGFile.armorBonusUI !== null){
        //     desc = `${desc}Armor Bonus: **${CDGFile.armorBonusUI}**\n`
        // }
        // if(CDGFile.lifeBonusUI !== null){
        //     desc = `${desc}Life Bonus: **${CDGFile.lifeBonusUI}**\n`
        // }

        let embedArray = []

        let field1 = ''
        let field2 = ''
        let field3 = ''

        let side = 0
        let total = 0
        Object.keys(CDGFile.skillIDs).forEach(function(element, key, _array){
            //if(CDGFile.skillIDs[element].displayName !== undefined || CDGFile.skillIDs[element].name !== undefined) {
                // let name
                // if(CDGFile.skillIDs[element].displayName === ""){
                //     name = CDGFile.skillIDs[element].name
                // }else{
                //     name = CDGFile.skillIDs[element].displayName
                // }

                if (side % 3 === 0) {
                    field1 = `${field1}SkillID: [**${element}**]\n`
                } else if(side % 3 === 1) {
                    field2 = `${field2}SkillID: [**${element}**]\n`
                } else{
                    field3 = `${field3}SkillID: [**${element}**]\n`
                }
                side++
            //}
            total++
            if(field1.length > 950 || field2.length > 950){
                embedArray.push({
                    "field1": field1,
                    "field2": field2,
                    "field3": field3,
                })
                field1 = ''
                field2 = ''
                side = 0
            }
            if(Object.keys(CDGFile.skillIDs).length === total){
                embedArray.push({
                    "field1": field1,
                    "field2": field2,
                    "field3": field3,
                })
            }
        })
        let num = 1
        embedArray.forEach(function(e){
            let embed = msgEmbed.execute(`Cooldown Group: ${cdgID}`, desc,`https://lu-explorer.web.app/dashboard`, uIcon)

            embed.addField("Skills:", e.field1, true)
            if(e.field2 === ''){
                e.field2 = invisChar
            }
            embed.addField(invisChar, e.field2, true)
            embed.addField(invisChar, e.field3, true)
            embed.addField(invisChar, "**Try !skill [skillID] to view all items with a skill ID**", true)

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