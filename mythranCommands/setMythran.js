module.exports = {
    name: ['setmythran'],
    description: 'Give another user Mythran permissions.',
    args: true,
    use: `setMythran [id]`,
    example:[`setMythran 789705048035688458`],
    execute(message, args) {
        let config = require('./../config.json');
        function err(){
            try {
                //const help = require(`./help.js`);
                //help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error)
            }
        }
        if(args.length > 1) {err();}
        const fs = require('fs')
        let newMythranID = args[0]
        config.mythran.push(newMythranID)

        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
                message.channel.send("Done ✅")
            }
        );
    }
}
