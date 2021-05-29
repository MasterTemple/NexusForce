module.exports = {
    name: ['search'],
    description: 'Get results for a query in LEGO Universe',
    args: true,
    use: `search [query]`,
    example: [`search parrot`],
    execute(message, args) {
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

        if(args.length > 1 || isNaN(args[0])){
            let findAll = require(`./../functions/findAll.js`)
            var results = findAll.execute(args)
            if(results===undefined){
                message.channel.send("There were no results. :(")
                err()
                return
            }
        }else{
            message.channel.send("That is an ID.")
            return
        }
        // message.channel.send(`\`\`\`json\n${JSON.stringify(results, null, 2)}\n\`\`\``)
        // return
        const { uIcon, luExplorerURL, resURL, unknownImageURL, invisChar, emojis} = require('./../config.json')
        var desc = ''

        results.forEach(function(r, counter){
            let name = r.name
            if(name === ''){
                name = r.name
            }
            if(counter < 20){
                //desc = `${desc}**${counter+1}.** ${name} [[${r.id}]](${luExplorerURL}objects/${r.id}) - (${r.type})\n`
                desc = `${desc}**${counter+1}.** [[${r.id}]](${luExplorerURL}objects/${r.id}) ${name} **-** (${r.type})\n`

            }
        })

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        let embed = msgEmbed.execute(`Searching for: ${args.join(' ')}`, desc,`${luExplorerURL}objects`, uIcon)




        try {
            message.channel.send(embed)
        }catch{
            err()
        }
    }
}
