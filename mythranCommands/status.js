module.exports = {
    name: ['status'],
    description: 'Sets the status',
    args: true,
    use: `status [presence]`,
    example:[`status online`, `status idle`, `status dnd`],
    execute(message, args, params) {
        const client = message.client

        if (args[0] == `online`) {
            client.user.setPresence({status: 'online'});
        }
        if (args[0] == `idle`) {
            client.user.setPresence({status: 'idle'});
        }
        if (args[0] == `dnd`) {
            client.user.setPresence({status: 'dnd'});
        }
        message.channel.send("Done ✅")

    }
}
