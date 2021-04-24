module.exports = {
    name: ['items'],
    description: 'Get Items From ID List',
    args: true,
    use: `items [id]`,
    example: [`items 7415 7416 7417`],
    execute(message, args) {
        //command is mythran only to prevent spam/abuse, its useful when you want to look at a large number of IDs
        function err() {
            try {
                const help = require(`./../mythranCommands/mythran`);
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
        let itemFile = require(`./../commands/item`)
        for(let arg in args){
            itemFile.execute(message, [args[arg]])
        }

    }
}
