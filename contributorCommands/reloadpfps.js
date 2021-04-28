module.exports = {
    name: ['reloadpfps'],
    description: 'Reload the pfps of the enemies from handset ones',
    args: true,
    use: `reloadpfps [group]`,
    example:[`reloadpfps enemy`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`mythranCommands/mythran`);
                help.execute(message, module.exports.name)
                //console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        // if(args.length > 1 || isNaN(args[0])){
        //     let findOne = require(`./../functions/findOneEnemy.js`)
        //     var objectID = findOne.execute(args)
        //     if(objectID===undefined){
        //         message.channel.send("An enemy with this DisplayName or Name does not exist.")
        //         //err()
        //         return
        //     }
        // }else{
        //     var objectID = args[0]
        // }
        // var objectID = args[0]
        // let url = args[1]

        // message.reply(objectID)
        // return
        let pathName
        let dir
        let hasSubDir
        let subdir = ''
        if (args[0] === 'enemy' || args[0] === 'enemies'){
            pathName = "EnemyPFPUpdates"
            dir = 'enemies'
            hasSubDir = false
        }else if (args[0] === 'npc' || args[0] === 'npcs'){
            pathName = "NPCPFPUpdates"
            dir = 'npcs'
            hasSubDir = true
        }
        var presetFile = require('./../output/contributor/'+pathName+'.json')
        for(let c=0;c<presetFile.length;c++){
            let objectID = presetFile[c]['objectID']
            let url = presetFile[c]['path']
            if(hasSubDir){
                subdir = `/${Math.floor(parseInt(objectID)/256)}`
            }
            var file = require(`./../output/${dir}${subdir}/${objectID}.json`)

            const fs = require('fs')
            file.iconURL = url

            fs.writeFile(`./output/${dir}${subdir}/${objectID}.json`, JSON.stringify(file, null, 2), function (err) {
                    if (err) throw err;

                }
            );
        }

        message.channel.send("Please wait a minute for changes to finish.")

    }
}
