module.exports = {
    name: ['precondition', 'preconditions', 'pre'],
    description: 'Get the preconditions of an item in LEGO Universe',
    args: true,
    use: `preconditions [id]`,
    example: ['preconditions power jouster', `preconditions 12637`],
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
        if((args.length > 1 || isNaN(args[0])) && args[1] !== 'dm' ){
            let findOne = require(`./../functions/findOneItem.js`)
            var itemID = findOne.execute(args)
            if(itemID===undefined){
                message.channel.send("An item with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var itemID = args[0]
        }
        // const itemID = id
        const item = require(`./../output/objects/${Math.floor(itemID/256)}/${itemID}.json`);
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')

        let img = `${resURL}${item.iconURL}`

        if(item?.itemInfo?.name == undefined){
            item.itemInfo.name = "None"
        }
        if(item?.itemInfo?.description == undefined || item?.itemInfo?.description == ``){
            item.itemInfo.description = "None"
        }
        if(item?.itemInfo?.internalNotes == undefined){
            item.itemInfo.internalNotes = "None"
        }
        // console.log(item.itemInfo.name)
        // console.log(item.itemInfo.description)
        // console.log(item.itemInfo.internalNotes)

        for(let skill in Object.keys(item.objectSkills)){

            if(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description){
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
            }
        }

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        var description = `**Preconditions:**`
        try {
            Object.keys(item?.itemComponent?.preconditionDescriptions).forEach(function (element, key) {
                description = `${description}\n**${key + 1}. **${item.itemComponent.preconditionDescriptions[element]}`
            })
        }catch{
            description = `${description}\nThis item has no preconditions.`
        }

        let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, description, `${luExplorerURL}objects/${itemID}`, img)

        try {
            if(args[1] !== 'dm') {
                message.channel.send(embed)
            }else if(args[1] === 'dm'){
                message.author.send(embed)
            }
        }catch{
            err()
        }
    }
}
