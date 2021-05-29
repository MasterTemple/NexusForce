module.exports = {
    name: ['displaymythran', 'displaymythrans'],
    description: 'Displays all Mythran.',
    args: true,
    use: `displayMythran [id]`,
    example:[`displayMythran 789705048035688458`],
    execute(message, args, params) {
        let config = require('./../config.json');
        function err(){
            try {
                const help = require(`./mythran.js`);
                help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error)
            }
        }
        const client = message.client
        //let info = `**Mythrans:**\`\`\`\n<@${config.mythran.join('>\n<@')}>\`\`\``
        let info = `**Mythrans:**\n`
        for(let u=0;u<config.mythran.length;u++) {
            const User = client.users.cache.get(config.mythran[u]); // Getting the user by ID.
            if (User) { // Checking if the user exists.
                info = `${info}${config.emojis.mythran} ${User.tag}\n`
            } else {
                info = `${info}${config.emojis.mythran} @${config.mythran[u]}\n`
            }

        }

        message.channel.send(info)

    }
}
