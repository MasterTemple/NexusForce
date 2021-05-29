module.exports = {
    name: ['link'],
    description: 'Sets the name of a LootTableIndex',
    args: true,
    use: `link [id]`,
    example:[`link 7570`],
    execute(message, args, params) {
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
       message.channel.send(`https://github.com/MasterTemple/NexusForce/blob/main/output/objects/${Math.floor(parseInt(args[0])/256)}/${args[0]}.json`)
    }
}
