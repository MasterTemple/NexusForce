module.exports = {
    name: ['mission', 'achievement'],
    description: 'ADD DESCRIPTION',
    args: true,
    use: `mission [id]`,
    example: [`mission 7570`],
    execute(message, args) {
        function err() {
            try {
                //const help = require(`./help.js`);
                //help.execute(message, module.exports.name)
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
                message.channel.send("A mission with this Name does not exist.")
            }
        }else{
            var objectID = args[0]
        }
        var missionFile = require(`./../json/MissionsAndAchievements/${Math.floor(objectID/256)}/${objectID}.json`)
        if(missionFile)
            console.log(missionFile)
        message.channel.send(`\`\`\`json\n${JSON.stringify(missionFile,null, 2)}\`\`\``)



    }
}
