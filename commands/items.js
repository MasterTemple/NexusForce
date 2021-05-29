module.exports = {
    name: ['items'],
    description: 'Get Items From ID List',
    args: true,
    use: `items [id]`,
    example: [`!items 7570 7415 7416`],
    execute(message, args, params) {
        function err() {
            try {
                const help = require(`./help.js`);
                help.execute(message, module.exports.name)
                //console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        if(isNaN(args[0])){
            message.channel.send("Please only use Item IDs does not exist.")
            err()
            return
        }
        let itemFile = require(`./item.js`)
        for(let arg in args){
            // itemFile.execute(message, [args[arg], 'dm'])
            params['send_to_dm'] = true
            itemFile.execute(message, [args[arg]], params)
        }
        message.channel.send("DMs Sent.")

    }
}
