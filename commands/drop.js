module.exports = {
    name: ['drop', 'dropf'],
    description: 'See what drops an item',
    args: true,
    use: `drop [name or ID]`,
    example: ['drop red parrot', `drop 7570`],
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
            let findOne = require(`./../functions/fineOneBrickOrItem.js`)
            var objectID = findOne.execute(args)
            if(objectID===undefined){
                message.channel.send("A LEGO Brick or item with this DisplayName or Name does not exist.")
                //err()
                return
            }
        }else{
            var objectID = args[0]
        }
        // const commandName = message.content.slice(1).trim().split(/ +/).shift().toLowerCase(); //each space is a new argument
        var dropFile = require(`./../output/objects/${Math.floor(objectID/256)}/${objectID}.json`)
        const { uIcon, luExplorerURL, resURL, unknownImageURL} = require('./../config.json')
        const commandName = message.content.slice(1).trim().split(/ +/).shift().toLowerCase(); //each space is a new argument
        let displayFractions = false
        if(commandName === 'dropf'){
            displayFractions = true
        }
        if(params?.fractions === true){
            displayFractions = true
        }
        let msgEmbed = require(`./../functions/embedTemplate.js`)
        if(dropFile.itemComponent.levelRequirement === undefined){
            dropFile.levelRequirement = 0
        }
        let img = `${resURL}${dropFile.iconURL}`

        //console.log(img)

        let embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, img)
        let embedArray = []
        var embedField = function(name, value, inline){
            let obj = {
                name: name,
                value: value,
                inline: inline
            }

            return obj
        };

        var vendorInfo = ``
        var dropsSomething = false
        let c = 0
        let wasDMed = false
        embedArray.push(embedField())
        for(var e=0;e<Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length;e++){

            // if(dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].displayName !== null) {
            //     vendorInfo = `${vendorInfo}${dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].displayName} [${dropFile.buyAndDrop.LootMatrixIndexes[dropFile.buyAndDrop.LootMatrixIndexes[e]].id}]\n`
            // }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName !== undefined) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    // console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false))
                    }
                }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }
                }else{
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }
                }
                dropsSomething = true
            }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent.lenth !== 0 && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]] !== undefined && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]].includes("Wishing") === false && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]].includes("Race") === false) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false))
                    }
                }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }
                }else{
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }
                }
                dropsSomething = true
            }
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName !== undefined) {
                //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false))
                    }
                }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }
                }else{
                    if(displayFractions){
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }else{
                        embedArray.push(embedField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false))
                    }
                }
                dropsSomething = true
            }

            // if(embed.fields.length > 25){
            //     message.author.send(embed)
            //     embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, dropFile.iconURL)
            //     wasDMed = true
            // }
            //
            // c++
            // if(c === Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length && embed.fields.length !== 0 && wasDMed){
            //     message.author.send(embed)
            //     message.channel.send("Direct Messages Sent!")
            //     //embed = msgEmbed.execute(`${dropFile.itemInfo.displayName} [${dropFile.objectID}]`, undefined,`${luExplorerURL}objects/${dropFile.objectID}`, dropFile.iconURL)
            // }else if(c === Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length && embed.fields.length !== 0){
            //     message.channel.send(embed)
            // }

        }

        // if(dropFile.buyAndDrop.Vendors.length === 1){
        //     embedArray.push(embedField(`Vendor:`, vendorInfo, false))
        // }else if(dropFile.buyAndDrop.Vendors.length > 1){
        //     embedArray.push(embedField(`Vendors:`, vendorInfo, false))
        // }else if(dropFile.commendationVendor.length === 1 && dropFile.commendationCost !== null){
        //     embedArray.push(embedField(`Vendor:`, `Honor Accolade - Commendation Vendor [13806]`, false))
        // }else if(dropFile.type === "LEGO brick"){
        //     embedArray.push(embedField(`Vendor:`, `${dropFile.brickVendorDisplayName} [${dropFile.brickVendorID}]`, false))
        // }else{
        //     embedArray.push(embedField(`This Item Is Not Sold!`, "Try **!earn** or **!drop** to see how to unlock this item!", false))
        // }



        if(!dropsSomething){
            embedArray.push(embedField(`This Item Is Not Dropped`, "Try **!earn** or **!buy** to see how to unlock this item!", false))
            message.channel.send(embed)
        }
        let groupedFields = {}
        let embed_divide_number = 8
        for(let i=0;i<=embedArray.length/embed_divide_number;i++){
            groupedFields[i] = []
        }
        embedArray.forEach(function(em, count){
            groupedFields[Math.floor(count/embed_divide_number)].push(em)
        })
        Object.keys(groupedFields).forEach(function (e){
            groupedFields[e].shift()
        })

        let previous_button = new params.buttons.MessageButton()
            .setStyle('blurple')
            .setLabel('Previous')
            .setID('previous_result')
        let next_button = new params.buttons.MessageButton()
            .setStyle('blurple')
            .setLabel('Next')
            .setID('next_result')
        let percent_button = new params.buttons.MessageButton()
            .setStyle('blurple')
            .setLabel('Percents')
            .setID('buy_to_percent')
        let fraction_button = new params.buttons.MessageButton()
            .setStyle('blurple')
            .setLabel('Fractions')
            .setID('buy_to_fraction')
        let back_button = new params.buttons.MessageButton()
            .setStyle('blurple')
            .setLabel('Back')
            .setID('back_to_item')


        if(displayFractions){
            fraction_button.setStyle('green')
        }else{
            percent_button.setStyle('green')
        }
        let page
        if(params['page'] === undefined){
            page = 0
        }else{
            page = params['page']
        }
        if(page === 0){
            previous_button.setDisabled(true)
        }
        if(page === Object.keys(groupedFields).length-1){
            next_button.setDisabled(true)
        }
        embed.setTitle(`${embed.title} (${page+1})`)
        // Object.keys(groupedFields).forEach(function(e){
        //     console.log(e, groupedFields[e].length)
        // })
        //console.log(Object.keys(groupedFields))
        // message.channel.send(`\`\`\`${JSON.stringify(groupedFields, null, 2)}\`\`\``)
        // Object.keys(groupedFields).forEach(function(group, count){
        //     console.log(groupedFields[group], count)
        //     groupedFields[group].forEach(function(field){
        //         embed.addField(field['name'], field['value'], field['inline'])
        //     })
        //     if(params['send_to_dm'] === true){
        //         message.author.send({ buttons: [
        //                 previous_button, next_button, percent_button, fraction_button, back_button
        //             ], embed: embed })
        //     }
        //     else if(params['edit_message'] === true) {
        //         message.edit({ buttons: [
        //                 previous_button, next_button, percent_button, fraction_button, back_button
        //             ], embed: embed })
        //     }
        //     else {
        //         message.channel.send({ buttons: [
        //                 previous_button, next_button, percent_button, fraction_button, back_button
        //             ], embed: embed })
        //     }
        //     embed.fields = []
        // })
        groupedFields[`${page}`].forEach(function(field){
            embed.addField(field['name'], field['value'], field['inline'])
        })
        if(params['send_to_dm'] === true){
            message.author.send({ buttons: [
                    previous_button, next_button, percent_button, fraction_button, back_button
                ], embed: embed })
        }
        else if(params['edit_message'] === true) {
            message.edit({ buttons: [
                    previous_button, next_button, percent_button, fraction_button, back_button
                ], embed: embed })
        }
        else {
            message.channel.send({ buttons: [
                    previous_button, next_button, percent_button, fraction_button, back_button
                ], embed: embed })
        }


        //message.channel.send(`\`\`\`json\n${JSON.stringify(dropFile,null, 2)}\`\`\``)

        try {
            //message.channel.send(embed)
        }catch{
            err()
        }

    },
}
