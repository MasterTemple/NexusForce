module.exports = {
    name: ['item'],
    description: 'Info about an item in LEGO Universe',
    args: true,
    use: `item [id]`,
    example: [`item 7415`],
    execute(message, id) {
        const itemID = id
        const item = require(`./../json/Items/${Math.floor(itemID/256)}/${itemID}.json`);

        console.log(item)
    }
}
