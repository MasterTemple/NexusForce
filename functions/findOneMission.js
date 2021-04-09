module.exports = {
    execute(args) {
        const file = require(`./../output/references/Missions.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        for (var j = 0; j < (Object.keys(file).length);j++) {
            try{
                var allMatch = sorted.every(function (e) {
                    return file[j].name.toLowerCase().includes(e) + file[j].description.toLowerCase().includes(e)
                });
                if (allMatch) {
                    return file[j].id
                }
            }catch{}
        }
        //return

    }
}
