module.exports = {
    execute(args) {
        const item = require(`./../json/Reference/missionIDandName.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        for (var j = 0; j < (Object.keys(item["table"]).length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return item["table"][j].name.toLowerCase().includes(e)
                });
                if (allMatch) {
                    return item["table"][j].id
                }
            }catch{}
        }
        //return

    }
}
