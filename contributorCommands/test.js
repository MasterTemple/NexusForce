module.exports = {
    name: ['test'],
    description: 'Just testing perms',
    args: true,
    use: `test`,
    example: [`test`],
    execute(message, args) {
        function err() {
            try {
                const help = require(`./contributor.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        try {
            const {emojis} = require('./../config.json');
            message.reply(`TESTED ${emojis.rarity1} ${emojis.rarity2} ${emojis.rarity3} ${emojis.rarity4}`)
        }catch{
            err()
        }

    }
}
