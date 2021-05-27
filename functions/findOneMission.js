module.exports = {
    execute(args) {
        const item = require(`./../output/references/Missions.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        let match = item.find(e => sorted.every(function (el) {
            return e?.name?.toLowerCase().includes(el) + e?.description?.toLowerCase().includes(el)
        }))
        return match.id

    }
}
