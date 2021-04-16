module.exports = {
    execute(args) {
        const item = require(`./../output/references/BricksAndItems.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        for (var j = 0; j < (Object.keys(item).length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return item[j].name.toLowerCase().includes(e) + item[j].displayName.toLowerCase().includes(e)
                });
                if (allMatch) {
                    return item[j].id
                }
            }catch{}
        }
        //return

    }
}
