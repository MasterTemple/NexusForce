module.exports = {
    name: ['brick'],
    description: 'Get information on a brick',
    args: true,
    use: `brick [id]`,
    example: [`brick 3`],
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
            let findOne = require(`./old_functions/findOneObject`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }

        var brickFile = require(`./../json/Bricks/${Math.floor(objectID/256)}/${objectID}.json`)
        let msgEmbed = require(`./old_functions/embedTemplate.js`)
        console.log(brickFile)

        //let embed = msgEmbed.execute(brickFile.displayName, undefined,`https://lu-explorer.web.app/objects/${brickFile.objectID}`, brickFile.iconURL)
        let embed = msgEmbed.execute(`${brickFile.displayName} [${brickFile.id}]`, undefined,`https://lu-explorer.web.app/objects/${brickFile.id}`, brickFile.iconURL)
        embed.addFields(
            {name: "Name", value: brickFile.name, inline: true},
            {name: "Price", value: brickFile.price, inline: true},
            {name: "Stack Size", value: brickFile.stackSize, inline: true},
        )

        message.channel.send(embed)



    }
}
