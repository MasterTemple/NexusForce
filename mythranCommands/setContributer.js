module.exports = {
    name: ['setcontributor'],
    description: 'Give another user Contributor permissions.',
    args: true,
    use: `setcontributor [id]`,
    example:[`setcontributor 789705048035688458`],
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
        let newContributorID = args[0]
        config.contributor.push(newContributorID)

        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
                message.channel.send("Done ✅")
            }
        );
    }
}
