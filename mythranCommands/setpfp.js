module.exports = {
    name: ['setpfp'],
    description: 'Changes the bot\'s pfp',
    args: true,
    use: `setpfp [url]`,
    example:[`setpfp https://media.discordapp.net/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`],
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
        if(args.length > 1) {
            err()
            return
        }

        const fs = require('fs')
        const client = message.client
        let link = args[0]
        try{
            client.user.setAvatar(link)
            config.botIconURL = link
            message.channel.send("Done ✅")
        }catch(e){
            console.log(e)
            err()
        }



        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
            }
        );
    }
}
