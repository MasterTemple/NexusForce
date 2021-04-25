module.exports = {
    execute(args) {
        const info = require(`./../output/references/Activities.json`);
        //const info = item.info
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        for (var j = 0; j < (Object.keys(info).length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return Object.keys(info)[j].toLowerCase().includes(e)
                });
                if (allMatch) {
                    return [info[Object.keys(info)[j]].toString(), Object.keys(info)[j]]
                }
            }catch{}
        }
        //return

    }
}
