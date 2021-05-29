module.exports = {
    execute(args) {
        //const item = require(`./../output/references/Objects.json`);
        const item = require(`./../../../../IdeaProjects/playground_javascript/test.json`);

        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();
        let results = []
        let keys = Object.keys(item)
        for (var j = 0; j < (keys.length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    // return item[j].name.toLowerCase().includes(e) + item[j].displayName.toLowerCase().includes(e)
                    return item[j].name.toLowerCase().includes(e)
                });
                if (allMatch) {
                    results.push(item[j])
                }
            }catch{}
        }
        return results

    }
}
