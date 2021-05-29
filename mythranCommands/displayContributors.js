module.exports = {
    name: ['displaycontributor', 'displaycontributors'],
    description: 'Displays all Contributors.',
    args: true,
    use: `displayContributor [id]`,
    example:[`displayContributor 789705048035688458`],
    execute(message, args, params) {
        let config = require('./../config.json');
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
        const client = message.client
        //let info = `**Mythrans:**\`\`\`\n<@${config.contributor.join('>\n<@')}>\`\`\``
        let info = `**Contributors:**\n`
        for(let u=0;u<config.contributor.length;u++) {
            const User = client.users.cache.get(config.contributor[u]); // Getting the user by ID.
            if (User) { // Checking if the user exists.
                info = `${info}${User.tag}\n`
            } else {
                info = `${info}@${config.contributor[u]}\n`
            }

        }

        message.channel.send(info)

    }
}
