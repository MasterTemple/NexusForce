module.exports = {
    name: ['removemythran'],
    description: 'Remove\'s another users Mythran permissions.',
    args: true,
    use: `removeMythran [id]`,
    example:[`removeMythran 789705048035688458`],
    execute(message, args, params) {
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
		config.mythran = config.mythran.filter(function(item) {
			return item !== newMythranID
		})
        //config.mythran.pop(newMythranID)

        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
                message.channel.send("Done ✅")
            }
        );
    }
}
