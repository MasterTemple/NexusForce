module.exports = {
    name: ['setenemypfp'],
    description: 'Sets the pfp of an enemy',
    args: true,
    use: `setenemypfp [id] [args]`,
    example:[`setenemypfp 4712 http://blah`],
    execute(message, args) {
        message.channel.send("Command is under construction.")
        return
        let config = require('./../config.json');
        let file = require(`./../json/Reference/LootTableIndexNames.json`)
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
        let lti = args[0]
        args.shift()
        let ltiName = args.join(' ')
        console.log(file["data"][lti])
        //message.reply(`${lti} ${ltiName} ${file["data"][lti]["Name"]}`)

        // ltiName.join('+')
        // message.reply(lti, ltiName)
        //
        // config.mythran.push(newMythranID)
        file["data"][lti]["Name"] = ltiName
        fs.writeFile ("./json/Reference/LootTableIndexNames.json", JSON.stringify(file,null,2), function(err) {
                if (err) throw err;
                message.channel.send("Done ✅")
            }
        );
    }
}
