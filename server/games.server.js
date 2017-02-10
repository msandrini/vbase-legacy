const ITEMS_PER_PAGE = 20
const projectionForList = { title: 1, genre: 1, releaseIn: 1, otherNames: 1, company:1, editorScore: 1 }
const sortCriteria = { title:1 }
const basicCondition = { specialStatus: { $ne: 'homebrew' } }

const games = {

    byNames: (db, response, name, page = 0) => {
        const search = { regex: `.*${name}.*` }
        condition = Object.assign({}, basicCondition, {$or: [{ title: search }, { 'otherNames.name': search }] })
        const skip = page * ITEMS_PER_PAGE
        const gamesCursor = db.collection('games').find(condition, projectionForList)
        gamesCursor.skip(skip).limit(ITEMS_PER_PAGE).sort(sortCriteria).toArray((err1, docs) => {
            gamesCursor.count(false, (err2, count) => {
                docs = docs || []
                response.json({games: docs, total: count})
            })
        })
    },

    all: (db, response, page = 0) => {
        const skip = page * ITEMS_PER_PAGE
        const gamesCursor = db.collection('games').find(basicCondition, projectionForList)
        gamesCursor.skip(skip).limit(ITEMS_PER_PAGE).sort(sortCriteria).toArray((err1, docs) => {
            gamesCursor.count(false, (err2, count) => {
                response.json({games: docs, total: count})
            })
        })
    },

    advanced: () => {}

}

module.exports = games
