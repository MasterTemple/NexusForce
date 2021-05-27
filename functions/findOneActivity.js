module.exports = {
    execute(args) {
        const info = require(`./../output/references/Activities.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        let match = Object.keys(info).find(e => sorted.every(function (el) {
            return e.toLowerCase().includes(el)
        }))
        return [info[match].toString(), match]
    }
}
