module.exports = {
    execute(args) {
        const item = require(`./../json/Reference/id-name-type-displayName.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        for (var j = 0; j < (Object.keys(item["Sheet1"]).length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return item["Sheet1"][j].name.toLowerCase().includes(e) + item["Sheet1"][j].displayName.toLowerCase().includes(e)
                });
                if (allMatch) {
                    return item["Sheet1"][j].id
                }
            }catch{}
        }
        //return

    }
}
