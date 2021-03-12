module.exports = {
    name: ['drop', 'd'],
    description: 'See what enemies drop an item',
    args: true,
    use: `drop [id]`,
    example: [`drop 7570`],
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
            let findOne = require(`functions/findOneObject`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("An object with this DisplayName or Name does not exist.")
                err()
                return
            }
        }else{
            var objectID = args[0]
        }
        var dropFile = require(`./../json/Drops/DropInfoOnlyUsedEnemies/${Math.floor(objectID/256)}/${objectID}.json`)
        if(dropFile)
        console.log(dropFile)
        message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)



    }
}
