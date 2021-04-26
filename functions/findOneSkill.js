module.exports = {
    execute(args) {
        const item = require(`./../output/references/Skills.json`);
        let sorted = [];
        for (var i = 0; i < args.length; i++) {
            sorted.push(args[i].toLowerCase());
        }
        sorted.sort();

        // for (var j = 0; j < (Object.keys(item).length);j++) {
        //     try{
        //         var allMatch = sorted.every(function (e) {
        //             return item[j].name.toLowerCase().includes(e) + item[j].displayName.toLowerCase().includes(e)
        //         });
        //         if (allMatch) {
        //             return item[j].cdg
        //         }
        //     }catch{}
        // }
        let skillID
        Object.keys(item).forEach(function(el, key,arr){
            //console.log(el,key)

            try{
                var allMatch = sorted.every(function (e) {
                    return item[el].name.toLowerCase().includes(e)
                });
                if (allMatch) {
                    //console.log(Object.keys(item)[key], item[el])
                    skillID = Object.keys(item)[key]
                    return Object.keys(item)[key]
                }
            }catch{}
        })
        //console.log(skillID)
        return skillID



        //return

    }
}
