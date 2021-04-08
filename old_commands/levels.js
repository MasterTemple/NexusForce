module.exports = {
    name: ['level'],
    description: 'Get information about levels',
    args: true,
    use: `level [lvl]`,
    example: [`level 30`],
    execute(message, args) {
        console.log(args)
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
            let findOne = require(`./../functions/findOneObject`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("Please Enter a Level.")
                err()
                return
            }
        }else if(parseInt(args[0]) > 85 || parseInt(args[0]) < 1){
            message.channel.send("Please Enter a Level Between 1 and 85.")
            err()
            return
        }
        else{
            var objectID = args[0]
        }

        var levelFile = require(`./../json/Reference/levels.json`)
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        var iconURL = `https://static.wikia.nocookie.net/legomessageboards/images/c/ce/LU2.png/revision/latest?cb=20121121213649`

        var required = levelFile.LevelProgressionLookup[objectID-1].requiredUScore
        var this_level = levelFile.LevelProgressionLookup[objectID-1].requiredUScore - levelFile.LevelProgressionLookup[objectID-2].requiredUScore
        required = required.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this_level = this_level.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        let embed = msgEmbed.execute(`Level ${objectID}!`, undefined,`https://lu-explorer.web.app/misc/level-progression`, iconURL)
        embed.addFields(
            { name: `Requirements`, value: `**For Level ${objectID}:**`, inline: true },
            { name: `From Level ${objectID-1}`, value: `${this_level} Experience `, inline: true },
            { name: `Total`, value: `${required} Experience`, inline: true },
        )

        message.channel.send(embed)

    }
}
