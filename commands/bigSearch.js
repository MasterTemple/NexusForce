module.exports = {
    name: ['bigsearch', 'searchall'],
    description: 'Get ALL results for a query in LEGO Universe',
    args: true,
    use: `searchall [query]`,
    example: [`searchall parrot`],
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
        let msgEmbed = require(`./../functions/embedTemplate.js`)

        const { uIcon, luExplorerURL, resURL, unknownImageURL, invisChar, emojis} = require('./../config.json')
        let embed = msgEmbed.execute(`Searching for: ${args.join(' ')}`, undefined,`${luExplorerURL}objects`, uIcon)
        var desc = ''
        let c = 0
        let desc_array = []
        results.forEach(function(r, counter){
            c++
            let name = r.name
            if(name === ''){
                name = r.name
            }
            desc = `${desc}**${counter+1}.** [[${r.id}]](${luExplorerURL}objects/${r.id}) ${name} **-** (${r.type})\n`
            if(c === 18){
                //desc = `${desc}**${counter+1}.** ${name} [[${r.id}]](${luExplorerURL}objects/${r.id}) - (${r.type})\n`
                //desc = `${desc}**${counter++}.** [[${r.id}]](${luExplorerURL}objects/${r.id}) ${name} **-** (${r.type})\n`
                desc_array.push(desc)
                desc = ''
                c = 0
            }
        })
        desc_array.forEach(async function(d){
            //console.log(d.length)
            // await embed.setDescription(d)
            embed = msgEmbed.execute(`Searching for: ${args.join(' ')}`, d,`${luExplorerURL}objects`, uIcon)
            //console.log(embed.description)
            await message.author.send(embed)


        })

        message.channel.send("DMs Sent!")






        // try {
        //     message.channel.send(embed)
        // }catch{
        //     err()
        // }
    }
}
