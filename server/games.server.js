const ITEMS_PER_PAGE = 20
const projectionForList = { title: 1, genre: 1, releaseIn: 1, otherNames: 1, company: 1, editorScore: 1 }
const sortCriteria = { title: 1 }
const basicCondition = { specialStatus: { $ne: 'homebrew' } }

const _regExpParam = str => ({ $regex: `.*${str}.*` });

const _getGames = (cursor, page, response) => {
    const skip = page * ITEMS_PER_PAGE
    cursor.skip(skip).limit(ITEMS_PER_PAGE).sort(sortCriteria).toArray((err, docs) => {
        if (err) {
            response.status(500)
            response.json({ error: err, errorType: 'find' })
        } else {
            cursor.count(false, (errCount, count) => {
                if (errCount) {
                    response.status(500)
                    response.json({ error: errCount, errorType: 'count' })
                } else {
                    docs = docs || []
                    response.json({ games: docs, total: count })
                }
            })
        }
    })
}

const games = {

    byNames: (db, response, name, page = 0) => {
        const search = _regExpParam(name);
        const condition = Object.assign({}, basicCondition, { $or: [{ title: search }, { 'otherNames.name': search }] })
        const gamesCursor = db.collection('games').find(condition, projectionForList)
        _getGames(gamesCursor, page, response)
    },

    all: (db, response, page = 0) => {
        const gamesCursor = db.collection('games').find(basicCondition, projectionForList)
        _getGames(gamesCursor, page, response)
    },

    advanced: (db, response, query, page = 0) => {
        const data = JSON.parse(query)
        let conditions = Object.assign({}, basicCondition, {})
        if (data.company) {
            conditions.company = _regExpParam(data.company)
        }
        if (data.description) {
            conditions.description = _regExpParam(data.description)
        }
        if (data.genre) {
            conditions.genre = _regExpParam(data.genre)
        }
        if (data.names) {
            conditions.names = { $or: [{ title: _regExpParam(data.names) }, { 'otherNames.name': _regExpParam(data.names) }] }
        }
        if (data.series) {
            conditions.series = _regExpParam(data.series)
        }
        if (data.scores.from || data.scores.to) {
            conditions.editorScore = {}
            if (data.scores.from) {
                conditions.editorScore['$gte'] = parseFloat(data.scores.from)
            }
            if (data.scores.to) {
                conditions.editorScore['$lte'] = parseFloat(data.scores.to)
            }
        }
        if (data.sizes.from || data.sizes.to) {
            conditions.cartridgeSize = {}
            if (data.sizes.from) {
                conditions.cartridgeSize['$gte'] = parseFloat(data.sizes.from)
            }
            if (data.sizes.to) {
                conditions.cartridgeSize['$lte'] = parseFloat(data.sizes.to)
            }
        }
        if (data.years.from || data.years.to) {
            conditions.year = {}
            if (data.years.from) {
                conditions.year['$gte'] = parseInt(data.years.from, 10)
            }
            if (data.years.to) {
                conditions.year['$lte'] = parseInt(data.years.to, 10)
            }
        }
        const condition = {}
        const gamesCursor = db.collection('games').find(conditions, projectionForList)
        _getGames(gamesCursor, page, response)
    }

}

module.exports = games
