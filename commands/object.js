module.exports = {
    name: ['type','id', 'object', 'obj'],
    description: 'Gives type from ID',
    args: true,
    use: `type [id]`,
    example:[`type 7415`],
    execute(message, args) {
        function err(){
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
        console.log(objectID)

        try {
            let objectInformationFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
            let type = objectInformationFile.itemInfo.type
            //return

            if (type === (`NPC`) || type === (`UserGeneratedNPCs`)) {
                const func = require(`./npc.js`);
                try {
                    func.execute(message, [objectID]);
                } catch (error) {
                    console.error(error);
                }
                return
            } else if (type === 'Loot') {
                const func = require(`./item.js`);
                try {
                    func.execute(message, [objectID]);
                } catch (error) {
                    console.error(error);
                }
                return
            } else if (type === 'Enemies') {
                const func = require(`./enemies.js`);
                //func.execute()
                try {
                    func.execute(message, args);
                } catch (error) {
                    console.error(error);
                }
                return
            } else if (type === 'LEGO brick') {
                const func = require(`./brick.js`);
                //func.execute()
                try {
                    func.execute(message, [objectID]);
                } catch (error) {
                    console.error(error);
                }
                return
            } else {
                message.channel.send(`Object [${id}] Type: **${type}**\nThis datatype is not currently supported.`)

            }
        } catch(e) {
            console.log(e)
            message.channel.send("An object for this ID does not even exist.")
        }


    }
}
