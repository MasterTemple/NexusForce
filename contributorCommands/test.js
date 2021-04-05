module.exports = {
    name: ['test'],
    description: 'Just testing perms',
    args: true,
    use: `test`,
    example: [`test`],
    execute(message, args) {
        function err() {
            try {
                //const help = require(`./help.js`);
                //help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error);
            }
        }
        message.reply('TESTED')

    }
}
