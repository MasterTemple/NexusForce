module.exports = {
    name: ['setenemypfp'],
    description: 'Sets the pfp of an enemy',
    args: true,
    use: `setenemypfp [id] [path]`,
    example:[`setenemypfp 6806 textures/ui/achievments/darkling_ape.png`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`./contributor.js`);
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
        var objectID = args[0]
        let url = args[1]

        // message.reply(objectID)
        // return
        var file = require(`./../output/enemies/${objectID}.json`)
        let config = require('./../config.json');
        //let file = require(`./../json/Reference/LootTableIndexNames.json`)
        function err(){
            try {
                const help = require(`./contributor.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error)
            }
        }
        if(args.length < 2) {
            err()
            return
        }
        const fs = require('fs')
        file.iconURL = url

        fs.writeFile (`./output/enemies/${objectID}.json`, JSON.stringify(file,null,2), function(err) {
            if (err) throw err;
            let logFile = require('../output/contributor/EnemyPFPUpdates.json')
            logFile[objectID] = url
            // logFile.push({
            //     "objectID": objectID,
            //     "path": url
            // })

            fs.writeFile (`./output/contributor/EnemyPFPUpdates.json`, JSON.stringify(logFile,null,2), function(err) {
                    if (err) throw err;
                }
            );
            message.channel.send("Done ✅")
        }
    );

    }
}
