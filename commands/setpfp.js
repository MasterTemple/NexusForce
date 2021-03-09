module.exports = {
    name: ['setpfp'],
    description: 'Changes the bot\'s pfp',
    args: true,
    use: `setpfp [url]`,
    example:[`setpfp https://media.discordapp.net/attachments/641133444746838016/813621671461781544/circle-cropped_1.png`],
    execute(message, args) {
        let config = require('./../config.json');
        if(!config.owner.includes(message.author.id) || args.length > 1) {return;}
        function err(){
            try {
                //const help = require(`./help.js`);
                //help.execute(message, module.exports.name)
                console.log(`fail`)
                return
            } catch (error) {
                console.error(error)
            }
        }
        const fs = require('fs')
        const client = message.client
        let link = args[0]
        try{
            client.user.setAvatar(link)
            config.iconURL = link
        }catch(e){
            console.log(e)
            err()}



        fs.writeFile ("config.json", JSON.stringify(config,null,2), function(err) {
                if (err) throw err;
            message.channel.send("Done ✅")
            }
        );
    }
}
