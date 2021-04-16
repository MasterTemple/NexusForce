module.exports = {
    name: ['setprefix'],
    description: 'Sets the prefix of the bot.',
    args: true,
    use: `setprefix [char]`,
    example:[`setprefix +`],
    execute(message, args) {
        let config = require('./../config.json');
        function err(){
            try {
                const help = require(`./mythran.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error)
            }
        }
        if(args.length > 1) {
            err()
            return
        }
        const fs = require('fs')
        let newMythranID = args[0]
        config.prefix = newMythranID

        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
                message.channel.send("Done ✅")
            }
        );
    }
}
