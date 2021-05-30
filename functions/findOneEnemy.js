module.exports = {
    execute(args) {
        const item = require(`./../output/references/Enemies.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        let match = item.find(e => sorted.every(function (el) {
            return e?.name?.toLowerCase().includes(el)
        }))
        try{
            return match.id
        }catch{
            const SQLEnemies = require(`./../output/references/SQLEnemies.json`);


            let match = SQLEnemies.find(e => sorted.every(function (el) {
                return e?.name?.toLowerCase().includes(el) + e?.displayName?.toLowerCase().includes(el)
            }))
            return match.id
        }

    }
}
