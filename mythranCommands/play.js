module.exports = {
    name: ['play'],
    description: 'Set what the bot is playing. It will keep this status even when restarted.',
    args: true,
    use: `play [args]`,
    example:[`play LEGO Universe`],
    execute(message, args) {
        let config = require('./../config.json');
        const fs = require('fs')


        const client = message.client
        if(args.length >0) {
            var new_status = args[0]
            for (var i = 1; i < args.length; i++) {
                new_status = `${new_status} ${args[1]}`
            }
            client.user.setPresence({activity: {name: new_status}});
        }else{
            client.user.setActivity();
        }
        config.startupStatus = new_status

        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
                message.channel.send("Done ✅")
            }
        );

    }
}
