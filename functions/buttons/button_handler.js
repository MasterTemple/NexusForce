module.exports = {
    execute(button){
        //console.log(button.id, button.message.id, button.clicker)
        let old_embed = button.message.embeds[0]
        let id_regex = /\[(?<number>\d+)\]/g
        try {
            var array = [...old_embed.title.matchAll(id_regex)]
            var itemID = array[0]['groups']['number']
        }catch{

        }
        console.log(itemID)
        switch(button.id) {
            case 'test':
                let embed = button.message.embeds[0]
                embed.setTitle('This is an edited embed')
                button.message.edit(embed)
            case 'continue_simulation':
                let sim_regex = /(?<first>\d) in (?<second>(\d|,)+)/g
                let sim_array = [...old_embed.fields[0].name.matchAll(sim_regex)]
                let first = sim_array[0]['groups']['first']
                let second = sim_array[0]['groups']['second'].replace(',','')
                function getRndInteger(min, max) {
                    return Math.floor(Math.random() * (max - min) ) + min;
                }
                let roll = 0
                let num = 0

                while(num !== second){
                    num = getRndInteger(0, parseInt(second)+1)

                    //console.log(num)
                    roll++
                    if(num === parseInt(second)) {
                        roll = roll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        second = second.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if (roll[roll.length - 1] === '1' && roll[roll.length - 2] !== '1') {
                             var new_string_value = `You got one on your ${roll}st roll!`
                        } else if (roll[roll.length - 1] === '2' && roll[roll.length - 2] !== '1') {
                             var new_string_value = `You got one on your ${roll}nd roll!`
                        } else if (roll[roll.length - 1] === '3' && roll[roll.length - 2] !== '1') {
                             var new_string_value = `You got one on your ${roll}rd roll!`
                        } else {
                             var new_string_value = `You got one on your ${roll}th roll!`
                        }
                        //console.log(old_embed)
                        old_embed.fields[0].value = new_string_value
                        //console.log(old_embed)
                        const buttons = require('discord-buttons')
                        let continue_simulation = new buttons.MessageButton()
                            .setStyle('blurple')
                            .setLabel('Again')
                            .setID('continue_simulation')
                        let quit_simulation = new buttons.MessageButton()
                            .setStyle('blurple')
                            .setLabel('Finish')
                            .setID('quit_simulation')
                        button.message.edit({ buttons: [
                                continue_simulation, quit_simulation
                            ], embed: old_embed })
                        //button.message.edit(old_embed)
                        break
                    }


                }
                //console.log(first, second)
                break
            case 'quit_simulation':
                const buttons = require('discord-buttons')
                // let continue_simulation = new buttons.MessageButton()
                //     .setStyle('blurple')
                //     .setLabel('Again')
                //     .setID('continue_simulation')
                let finished = new buttons.MessageButton()
                    .setStyle('blurple')
                    .setLabel('Finished')
                    .setID('quit_simulation')
                    .setDisabled()
                button.message.edit({ buttons: [
                        finished
                    ], embed: old_embed })
                break
            case 'drop':

                break
            case 'earn':
                break
            case 'buy':
                break
            case 'back':
                break
        }
        button.defer()
    }
}