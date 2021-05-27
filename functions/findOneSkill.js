module.exports = {
    execute(args) {
        const item = require(`./../output/references/Skills.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        let match = Object.keys(item).find(e => sorted.every(function (el) {
            return item[e].name?.toLowerCase()?.includes(el)
        }))
        return match


    }
}
