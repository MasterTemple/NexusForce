module.exports = {
    name: ['cooldowngroup', 'group'],
    description: 'Get all items in a certain cooldown group',
    args: true,
    use: `group [id]`,
    example: [`group 21`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }

        if(args.length > 1 || isNaN(args[0])){
            let findOne = require(`./../functions/findOneMission.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                //message.channel.send("A mission with this Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var cooldownFile = require(`./../json/Cooldowns/${objectID}.json`)
        //if(cooldownFile)
        console.log(cooldownFile)
        //message.channel.send(`\`\`\`json\n${JSON.stringify(cooldownFile,null, 2)}\`\`\``)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        var iconURL = `https://static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest?cb=20121121213649`

        var description = ``
       for(var x=0;x<cooldownFile.objects.length;x++){
           if(cooldownFile.objects[x].displayName === null){
               cooldownFile.objects[x].displayName = cooldownFile.objects[x].name
           }
           description = `${description} **${cooldownFile.objects[x].displayName}** [${cooldownFile.objects[x].itemID}]: **${cooldownFile.objects[x].cooldownTime}** Seconds\n`

       }

        var embed = msgEmbed.execute(`Cooldown Group ${cooldownFile.cooldowngroup}`, description, `https://lu-explorer.web.app/`, iconURL)

        // embed.addFields(
        //     {name: "Type", value: cooldownFile.type, inline: true},
        //     //{ name: '឵឵ ឵឵ ឵឵ ', value:  '឵឵ ឵឵ ឵឵ ', inline: true },
        //     {name: "Objective", value: cooldownFile.objective, inline: true},
        //     {name: "Description", value: cooldownFile.description, inline: true},
        // )



        message.channel.send(embed)

    }
}
