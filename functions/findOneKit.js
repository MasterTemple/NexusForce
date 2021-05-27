module.exports = {
    execute(args) {
        const item = require(`./../output/references/Kits.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        let match = item.find(e => sorted.every(function (el) {
            return e.name.toLowerCase().includes(el)
        }))
        return match.id
        //return

    }
}
