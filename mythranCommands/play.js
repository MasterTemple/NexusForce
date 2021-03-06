module.exports = {
    name: ['play'],
    description: 'Set what the bot is playing',
    args: true,
    use: `play [args]`,
    example:[`play LEGO Universe`],
    execute(message, args, params) {
        const client = message.client
        if(args.length >0) {
            var new_status = args[0]
            for (var i = 1; i < args.length; i++) {
                new_status = `${new_status} ${args[1]}`
            }
            return client.user.setPresence({activity: {name: new_status}});
        }else{
            client.user.setActivity();
        }

    }
}
