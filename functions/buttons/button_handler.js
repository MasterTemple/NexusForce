module.exports = {
    execute(button, params){
        //console.log(button.id, button.message.id, button.clicker)
        let old_embed = button.message.embeds[0]
        let id_regex = /\[(?<number>\d+)\]/g
        try {
            var array = [...old_embed.title.matchAll(id_regex)]
            var itemID = array[0]['groups']['number']
        }catch{

        }
        try{
            let page_regex = /\((?<number>\d)+\)/g
            var page_arrray = [...old_embed.title.matchAll(page_regex)]
            params['page'] = page_arrray[0]['groups']['number'] - 1
        }catch{}
        //console.log(itemID)
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
                let drop = require('./../../commands/drop')
                params['edit_message'] = true
                drop.execute(button.message, [itemID], params)
                break
            case 'buy_to_percent':
                let buy_to_percent_drop = require('./../../commands/drop')
                params['edit_message'] = true
                params['fractions'] = false
                buy_to_percent_drop.execute(button.message, [itemID], params)
                break
            case 'buy_to_fraction':
                let buy_to_fraction_drop = require('./../../commands/drop')
                params['edit_message'] = true
                params['fractions'] = true
                buy_to_fraction_drop.execute(button.message, [itemID], params)
                break
            case 'previous_result':
                let previous_result_drop = require('./../../commands/drop')
                params['edit_message'] = true
                params['fractions'] = true
                params['page']--
                previous_result_drop.execute(button.message, [itemID], params)
                break
            case 'next_result':
                let next_result_drop = require('./../../commands/drop')
                params['edit_message'] = true
                params['fractions'] = true
                params['page']++
                next_result_drop.execute(button.message, [itemID], params)
                break
            case 'earn':
                let earn = require('./../../commands/earn')
                params['edit_message'] = true
                earn.execute(button.message, [itemID], params)
                break
            case 'buy':
                let buy = require('./../../commands/buy')
                params['edit_message'] = true
                buy.execute(button.message, [itemID], params)
                break
            case 'back_to_item':
                let item = require('./../../commands/item')
                params['edit_message'] = true
                item.execute(button.message, [itemID], params)

                break
            case 'item_more':
                let preconditions_button = new params.buttons.MessageButton()
                    .setStyle('blurple')
                    .setLabel('Preconditions')
                    .setID('preconditions')
                let package_button = new params.buttons.MessageButton()
                    .setStyle('blurple')
                    .setLabel('Package')
                    .setID('package')
                let back_button = new params.buttons.MessageButton()
                    .setStyle('blurple')
                    .setLabel('Back')
                    .setID('back_to_item')
                let item_is_not_package = true
                let item_has_no_preconditions = true
                let itemFile = require(`./../../output/objects/${Math.floor(itemID/256)}/${itemID}.json`)
                if(Object.keys(itemFile.components).includes('53')){
                    item_is_not_package = false
                }
                if(itemFile.itemComponent.preconditions !== null){
                    item_has_no_preconditions = false
                }
                if(item_is_not_package){
                    package_button.setDisabled(true)
                }
                if(item_has_no_preconditions || itemFile['itemInfo']['type'] === "LEGO brick"){
                    preconditions_button.setDisabled(true)
                }
                button.message.edit({ buttons: [
                        preconditions_button, package_button, back_button
                    ], embed: old_embed })
                break
            case 'preconditions':
                let preconditionsFile = require('./../../commands/preconditions')
                params['edit_message'] = true
                preconditionsFile.execute(button.message, [itemID], params)
                break
            case 'package':
                let packageFile = require('./../../commands/package')
                params['edit_message'] = true
                packageFile.execute(button.message, [itemID], params)
                break
            case 'package_fraction':
                let packageFileFraction = require('./../../commands/package')
                params['edit_message'] = true
                params['fractions'] = true
                packageFileFraction.execute(button.message, [itemID], params)
                break
            case 'package_percent':
                let packageFilePercent = require('./../../commands/package')
                params['edit_message'] = true
                params['fractions'] = false
                packageFilePercent.execute(button.message, [itemID], params)
                break
        }
        params['edit_message'] = false
        params['send_to_dm'] = false
        button.defer()
    }
}