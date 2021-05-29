module.exports = {
    name: ['level', 'levels', 'lvl', 'lvls'],
    description: 'Information about levels in LEGO Universe',
    args: true,
    use: `level [lvl]`,
    example: [`level 35`],
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
        if(!isNaN(args[0]) && parseInt(args[0]) < 86 && parseInt(args[0]) > 0) {
            var levelFile = require(`./../output/levelData/levels.json`)
            let msgEmbed = require(`./../functions/embedTemplate.js`)
            const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')

            let embed = msgEmbed.execute(`Level ${args[0]}!`, undefined, `${luExplorerURL}misc/level-progression`, uIcon)
            //console.log(levelFile[args[0]])
            var required = levelFile[args[0]].requiredUScore
            var this_level = levelFile[args[0]].fromPreviousLevel
            required = required.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this_level = this_level.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            embed.addFields(
                { name: 'Requirements', value: `**For Level ${args[0]}:**`, inline: true },
                { name: `From Level ${parseInt(args[0])-1}`, value: `${this_level} Experience`, inline: true },
                { name: 'Total', value: `${required} Experience`, inline: true },
            )
            try {
                message.channel.send(embed)
            }catch{
                err()
            }
        }else{
            message.channel.send(`${args[0]} is not a valid level. Please choose a level between 1 and 85.`)
        }


    }
}
