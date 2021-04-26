module.exports = {
    name: ['getupdatedfields', 'file'],
    description: 'Gets updated Fields',
    args: true,
    use: `getUpdatedFields [type]`,
    example:[`getUpdatedFields npc`, `getUpdatedFields enemy`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`./contributor.js`);
                help.execute(message, module.exports.name)
                //console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        if(args[0] == "enemy") {
            message.channel.send("Here Are All Updates.", {files: ["./output/contributor/EnemyPFPUpdates.json"]});
        }
        if(args[0] == "npc") {
            message.channel.send("Here Are All Updates.", {files: ["./output/contributor/NPCPFPUpdates.json"]});
        }

    }
}
