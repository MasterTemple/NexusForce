module.exports = {
    name: ['testsimulate',],
    description: 'Simulates a drop from LEGO Universe',
    args: true,
    use: `simulate [item name or ID] FROM [enemy Name or ID`,
    example: ['simulate red parrot from gf ape'],
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
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')

        let findOneItem = require(`./../functions/findOneItem.js`)
        let findOneEnemy = require(`./../functions/findOneEnemy.js`)
        let findOneActivity = require(`./../functions/findOneActivity.js`)
        let findOnePackage = require(`./../functions/findOnePackage.js`)

        const sim_params = message.content.slice(14).trim().toLowerCase().split(" from "); //each space is a new argument
        //const commandName = sim_params.shift().toLowerCase();
        // message.channel.send(sim_params)

        try{

            try{

                let paramName = sim_params[0].split(/ +/)
                if(paramName.length === 1 && isNaN(paramName[0]) === false){
                    var itemID = paramName[0]
                }else {
                    var itemID = findOneItem.execute(paramName)
                }
                var item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`)
                let img = `${resURL}${item.iconURL}`

                var embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)


            }catch(e){
                // console.log(e)
                message.channel.send('Item not found')
                return
            }
            if(item.buyAndDrop.LootTableIndexes.length === 0){
                let img = `${resURL}${item.iconURL}`

                var embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)

                embed.addField(`This Item Is Not Dropped`, "Try **!earn** or **!buy** to see how to unlock this item!", false)
                message.channel.send(embed)
                return
            }
            // message.channel.send(itemID)
            try{
                let paramName = sim_params[1].split(/ +/)
                if(paramName.length === 1 && isNaN(paramName[0]) === false){
                    var enemyID = paramName[0]
                    try {
                        var enemyFile = require(`./../output/enemies/${enemyID}.json`)
                    }catch{
                        var enemyFile = require(`./../output/activities/${enemyID}.json`)
                    }
                    var embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)


                }else {
                    try {
                        var enemyID = findOneEnemy.execute(paramName)
                        var enemyFile = require(`./../output/enemies/${enemyID}.json`)
                        //var embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)

                    }catch{
                        try{
                            var enemyID = findOnePackage.execute(paramName)
                            var enemyFile = require(`./../output/packages/${enemyID}.json`)

                        }catch{
                            var enemyIDArray = findOneActivity.execute(paramName)
                            //console.log(enemyIDArray)
                            var enemyID = enemyIDArray[0]
                            var activityName = enemyIDArray[1]
                            var enemyFile = require(`./../output/activities/${enemyID}.json`)
                            //enemyFile = enemyFile['activites'][activityName]
                        }

                    }
                }
            }catch(e){
                // console.log(e)
                message.channel.send('Enemy not found')
                return
            }
        }catch(e){
            // console.log(e)
            err()
            return
        }
        //console.log(itemID, enemyID)
        //message.channel.send(itemID, enemyID)

        // console.log(enemyID)
        // console.log(activityID)
        // if(enemyID) {
        //     var enemyFile = require(`./../output/enemies/${enemyID}.json`)
        // }
        // if(activityID){
        //     var enemyFile = require(`./../output/activities/${objectID}.json`)
        // }
        //console.log(activityID)
        try {
            var LMI = enemyFile.drop.LootMatrixIndex
            if(LMI === undefined){
                throw new Error("undefined")
            }
        }catch{
            try{
                var LMI = enemyFile.LootMatrixIndex
                if(LMI === undefined){
                    throw new Error("undefined")
                }
            }catch{
                try {
                    var LMI = enemyFile.activities[activityName].LootMatrixIndex
                }catch{
                    return
                }
            }

        }

        // for(let key=0;key<Object.keys(item.buyAndDrop.LootMatrixIndexes);key++){
        //
        // }
        if(item.itemComponent.levelRequirement === undefined){
            item.levelRequirement = 0
        }
        // if(item.iconURL !== "uIcon" || item.iconUFL !== "unknown" && item.iconURL.includes('http') === false){
        //     img = `${resURL}${item.iconURL}`
        // }else if(item.iconURL.includes('http')){
        //     img = item.iconURL
        // }else if(item.iconURL === "unknown"){
        //     img = unknownImageURL
        // }else{
        //     img = uIcon
        // }
        //console.log(img)



        //Object.keys(item['buyAndDrop']['LootMatrixIndexes'][LMI]['DestructibleComponent'])[0]
        try {
            var name = item['buyAndDrop']['LootMatrixIndexes'][LMI]['DestructibleComponent'][Object.keys(item['buyAndDrop']['LootMatrixIndexes'][LMI]['DestructibleComponent'])[0]]['enemyNames']['displayName']
        }catch{
            try{
                try{
                    var name = enemyFile.itemInfo.displayName
                }catch{

                    var name = activityName

                }
                //var name = activityName
            }catch {
                embed.addField(`This Item Is Not Dropped`, "Try **!earn** or **!buy** to see how to unlock this item!", false)
                message.channel.send(embed)
                return
            }
        }

        try {
            //console.log(LMI)
            var total_chance = item['buyAndDrop']['LootMatrixIndexes'][LMI]['overallChance']['howManyToKill']

        }catch(e){
            //console.log(e)
            embed.addField(`This Item Is Not Dropped By '${name}'`, "Try **!drop** to see what drops this item!", false)
            message.channel.send(embed)
            return
        }
        let not_rolled = true
        let roll = 0
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min) ) + min;
        }
        //console.log(total_chance)
        //var embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)
        // let img = `${resURL}${item.iconURL}`
        //
        // var embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, undefined,`${luExplorerURL}objects/${item.objectID}`, img)

        while(not_rolled){
            let num = getRndInteger(0, total_chance+1)
            //console.log(num)
            roll++
            if(num === total_chance){
                not_rolled = false
                roll = roll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                total_chance = total_chance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if(roll[roll.length-1] === '1' && roll[roll.length-2] !== '1' ){
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}st roll!`, false)
                }else if(roll[roll.length-1] === '2' && roll[roll.length-2] !== '1' ){
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}nd roll!`, false)
                }else if(roll[roll.length-1] === '3' && roll[roll.length-2] !== '1' ){
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}rd roll!`, false)
                }else {
                    embed.addField(`1 in ${total_chance} chance to drop ${item.itemInfo.displayName} from ${name}`, `You got one on your ${roll}th roll!`, false)
                }
                // message.channel.send(embed)
                const buttons = require('discord-buttons')
                let continue_simulation = new buttons.MessageButton()
                    .setStyle('blurple')
                    .setLabel('Again')
                    .setID('continue_simulation')
                let quit_simulation = new buttons.MessageButton()
                    .setStyle('blurple')
                    .setLabel('Finish')
                    .setID('quit_simulation')
                message.channel.send({ buttons: [
                        continue_simulation, quit_simulation
                    ], embed: embed })
            }
        }

        return

    }
}
