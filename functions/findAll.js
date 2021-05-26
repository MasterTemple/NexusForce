module.exports = {
    execute(args) {
        const item = require(`./../output/references/Objects.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();
        let results = []

        for (var j = 0; j < (Object.keys(item).length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return item[j].name.toLowerCase().includes(e) + item[j].displayName.toLowerCase().includes(e)
                });
                if (allMatch) {
                    results.push(item[j])
                }
            }catch{}
        }
        return results

    }
}
