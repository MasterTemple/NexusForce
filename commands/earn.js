module.exports = {
    name: ['earn'],
    description: 'See where to earn an item',
    args: true,
    use: `earn [id]`,
    example: [`earn 7570`],
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
        var earnFile = require(`./../json/Drops/EarnFromMission/${Math.floor(objectID/256)}/${objectID}.json`)
        if(earnFile.table.length !== 0){
            console.log(earnFile)
            message.channel.send(`\`\`\`json\n${JSON.stringify(earnFile,null, 2)}\`\`\``)
        }else{
            //console.log(`You cannot earn this item. Try !buy to see where you can buy this item or !drop to see where this item drops.`)
            message.channel.send(`>>> You cannot earn this item.\nTry one of the following:\n!buy to see where you can buy this item\n!drop to see where this item drops.`)
        }




    }
}
