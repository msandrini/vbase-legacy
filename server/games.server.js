const ITEMS_PER_PAGE = 20
const projectionForList = { title: 1, genres: 1, releaseIn: 1, otherNames: 1, companies: 1, editorScore: 1 }
const sortCriteria = { title: 1 }
const basicCondition = { specialStatus: { $ne: 'homebrew' } }

const _regExpParam = str => ({ $regex: `.*${str}.*` })
const _unique = (array) => array.filter((value, index, self) => self.indexOf(value) === index)

const _getGames = (db, cursor, page, response, pageSize = ITEMS_PER_PAGE) => {
	const skip = page * pageSize
	cursor.skip(skip).limit(pageSize).sort(sortCriteria).toArray((err, docs) => {
		if (err) {
			response.status(500).json({ error: err, errorType: 'find' })
		} else {
			cursor.count(false, (errCount, count) => {
				if (errCount) {
					response.status(500).json({ error: errCount, errorType: 'count' })
				} else {
					docs = docs || []
					let genres = []
					for (d of docs) {
						if (d.genres) {
							genres = [...genres, ...d.genres]
						}
					}
					if (genres.length) {
						const genresCondition = { _id: { $in: _unique(genres) } }
						db.collection('genres').find(genresCondition, { title: 1 }).toArray((errGenre, docsGenre) => {
							if (errGenre) {
								response.status(500).json({ error: errGenre, errorType: 'count' })
							} else {
								let genresObj = {}
								for (g of docsGenre) {
									genresObj[g._id] = g.title
								}
								for (d of docs) {
									let genresForThisDoc = []
									for (dg of d.genres) {
										genresForThisDoc.push(genresObj[dg])
									}
									d.genreTitles = genresForThisDoc
									delete d.genres
								}
								response.json({ games: docs, total: count })
							}
						})
					} else {
						response.json({ games: docs, total: count })
					}
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
		_getGames(db, gamesCursor, page, response)
	},

	all: (db, response, page = 0) => {
		const gamesCursor = db.collection('games').find(basicCondition, projectionForList)
		_getGames(db, gamesCursor, page, response)
	},

	fromSeries: (db, response, seriesIds) => {
		const condition = Object.assign({}, basicCondition, { series: { $in: seriesIds.split(',') }})
		const gamesCursor = db.collection('games').find(condition, { title: 1 })
		_getGames(db, gamesCursor, 0, response)
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
		_getGames(db, gamesCursor, page, response)
	}

}

module.exports = games

