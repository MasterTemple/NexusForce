module.exports = {
    execute(args) {
        const item = require(`./../output/references/LootTableIndexNames.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        for (var j = 0; j < item.length;j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return item[j].name.toLowerCase().includes(e) + item[j].altName.toLowerCase().includes(e)
                });
                if (allMatch) {
                    return item[j].lti
                }
            }catch{}
        }
        //return

    }
}
