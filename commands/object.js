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

        if(args.length == 1){
            var objectID = args[0]
            try {
                const client = message.client
                let objectInformationFile = require(`./../json/Reference/objects.json`)
                //console.log(objectInformationFile.table.find(a => a.id === objectID))
                let type = objectInformationFile.table.find(a => a.id === objectID).type
                //console.log(`Type: ${type}`)
                message.channel.send(`Object [${objectID}] Type: **${type}**`)
                return

                if (type == (`NPC`) || type == (`UserGeneratedNPCs`)) {
                    const func = require(`./npc.js`);
                    try {
                        func.execute(message, args);
                    } catch (error) {
                        console.error(error);
                    }
                    return
                } else if (type == 'Loot') {
                    const func = require(`./item.js`);
                    try {
                        func.execute(message, args);
                    } catch (error) {
                        console.error(error);
                    }
                    return
                } else if (type == 'Enemies') {
                    const func = require(`./enemies.js`);
                    //func.execute()
                    try {
                        func.execute(message, args);
                    } catch (error) {
                        console.error(error);
                    }
                    return
                } else if (type == 'LEGO brick') {
                    const func = require(`./brick.js`);
                    //func.execute()
                    try {
                        func.execute(message, args);
                    } catch (error) {
                        console.error(error);
                    }
                    return
                } else {
                    message.channel.send(`Object [${id}] Type: **${type}**\nThis datatype is not currently supported.`)
                }
            } catch {
                message.channel.send("An object for this ID does not even exist.")
            }
        }

    }
}
