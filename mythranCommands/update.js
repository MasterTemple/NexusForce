module.exports = {
    name: ['update'],
    description: 'Updates the bot',
    args: true,
    use: `update`,
    example: [`update`],
    execute(message, args) {
        //message.channel.send('Updating')
        message.author.send("Enemy", {files: ["./output/contributor/EnemyPFPUpdates.json"]});
        message.author.send("NPC", {files: ["./output/contributor/NPCPFPUpdates.json"]});

        const { exec } = require("child_process");
        try{
            exec("git remote add NexusForce https://github.com/MasterTemple/NexusForce.git master", (error, stdout, stderr) => {});
        }catch{}


        exec("git reset --hard", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        }).then( ()=> {
            exec("git pull", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
            });
        })


        message.channel.send('Update Complete.')

    }
}
