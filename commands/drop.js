module.exports = {
    name: ['drop', 'd'],
    description: 'See what enemies drop an item',
    args: true,
    use: `drop [id]`,
    example: [`drop 7570`],
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





    }
}
