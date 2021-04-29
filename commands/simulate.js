module.exports = {
    name: ['simulate',],
    description: 'Simulates a drop from LEGO Universe',
    args: true,
    use: `simulate [item name or ID] FROM [enemy Name or ID`,
    example: ['simulate red parrot from gf ape'],
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
        // if((args.length > 1 || isNaN(args[0])) && args[1] !== 'dm' ){
        //     let findOne = require(`./../functions/findOneItem.js`)
        //     var itemID = findOne.execute(args)
        //     if(itemID===undefined){
        //         message.channel.send("An item with this DisplayName or Name does not exist.")
        //         //err()
        //         return
        //     }
        // }else{
        //     var itemID = args[0]
        // }
        let findOneItem = require(`./../functions/findOneItem.js`)
        let findOneEnemy = require(`./../functions/findOneEnemy.js`)

        const params = message.content.slice(10).trim().toLowerCase().split(" from "); //each space is a new argument
        //const commandName = params.shift().toLowerCase();
        // message.channel.send(params)
        try{
            var itemID = findOneItem.execute(params[0].split(/ +/))
            // message.channel.send(itemID)
            var enemyID = findOneEnemy.execute(params[1].split(/ +/))
        }catch{
            err()
            return
        }
        //console.log(itemID, enemyID)
        //message.channel.send(itemID, enemyID)
        const item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`);
        var enemyFile = require(`./../output/enemies/${enemyID}.json`)
        const LMI = enemyFile.drop.LootMatrixIndex

        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        // for(let key=0;key<Object.keys(item.buyAndDrop.LootMatrixIndexes);key++){
        //
        // }
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(item.itemComponent.levelRequirement === undefined){
            item.levelRequirement = 0
        }
        let img
        if(item.iconURL !== "uIcon" || item.iconUFL !== "unknown" && item.iconURL.includes('http') === false){
            img = `${resURL}${item.iconURL}`
        }else if(item.iconURL.includes('http')){
            img = item.iconURL
        }else if(item.iconURL === "unknown"){
            img = unknownImageURL
        }else{
            img = uIcon
        }
        //console.log(img)

        let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)
        //Object.keys(item['buyAndDrop']['LootMatrixIndexes'][LMI]['DestructibleComponent'])[0]
        let name = item['buyAndDrop']['LootMatrixIndexes'][LMI]['DestructibleComponent'][Object.keys(item['buyAndDrop']['LootMatrixIndexes'][LMI]['DestructibleComponent'])[0]]['enemyNames']['displayName']
        let total_chance = item['buyAndDrop']['LootMatrixIndexes'][LMI]['overallChance']['howManyToKill']
        let not_rolled = true
        let roll = 0
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min) ) + min;
        }
        //console.log(total_chance)
        while(not_rolled){
            let num = getRndInteger(0, total_chance+1)
            //console.log(num)
            roll++
            if(num === total_chance){
                not_rolled = false
                roll = roll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if(roll === 1){
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}st roll!`, false)
                }else if(roll === 2){
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}nd roll!`, false)
                }else if(roll === 3){
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}rd roll!`, false)
                }else {
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}th roll!`, false)
                }
                message.channel.send(embed)
            }
        }
        //console.log(`You got one on your ${roll} roll!`)

        // embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll} roll!`, false)
        //
        // message.channel.send(embed)


        // embed.addField(, `Has a 1 in ${item['buyAndDrop']['LootMatrixIndexes'][LMI]['overallChance']['howManyToKill']} chance to drop ${item.buyAndDrop.LootMatrixIndexes[Object.keys(item.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${item.itemInfo.displayName}`, false)

        return



        // const itemID = id
        // const item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`);
        // // const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        //
        // if(item?.itemInfo?.name == undefined){
        //     item.itemInfo.name = "None"
        // }
        // if(item?.itemInfo?.description == undefined || item?.itemInfo?.description == ``){
        //     item.itemInfo.description = "None"
        // }
        // if(item?.itemInfo?.internalNotes == undefined){
        //     item.itemInfo.internalNotes = "None"
        // }
        // // console.log(item.itemInfo.name)
        // // console.log(item.itemInfo.description)
        // // console.log(item.itemInfo.internalNotes)
        //
        // for(let skill in Object.keys(item.objectSkills)){
        //
        //     if(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description){
        //         // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
        //         // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
        //         // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
        //     }
        // }
        //
        // let msgEmbed = require(`./../functions/embedTemplate.js`)
        //
        // var description = `**Preconditions:**`
        //
        // Object.keys(item.itemComponent.simulateDescriptions).forEach(function(element, key){
        //     description = `${description}\n**${key+1}. **${item.itemComponent.simulateDescriptions[element]}`
        // })
        //
        // let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, description, `${luExplorerURL}objects/${itemID}`, item.iconURL)
        //
        // try {
        //     if(args[1] !== 'dm') {
        //         message.channel.send(embed)
        //     }else if(args[1] === 'dm'){
        //         message.author.send(embed)
        //     }
        // }catch{
        //     err()
        // }
    }
}
