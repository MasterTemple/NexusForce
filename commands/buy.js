module.exports = {
    name: ['buy'],
    description: 'See where to buy an item',
    args: true,
    use: `buy [id]`,
    example: [`buy 7570`],
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
            let findOne = require(`./../functions/findOneObject.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var buyFile = require(`./../json/Buy/${Math.floor(objectID/256)}/${objectID}.json`)
        if(buyFile)
            console.log(buyFile)
        message.channel.send(`\`\`\`json\n${JSON.stringify(buyFile,null, 2)}\`\`\``)



    }
}
