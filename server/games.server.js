const ITEMS_PER_PAGE = 20
const projectionForList = { title: 1, genres: 1, releaseIn: 1, otherNames: 1, companies: 1, editorScore: 1 }
const sortCriteria = { title: 1 }
const basicCondition = { specialStatus: { $ne: 'homebrew' } }

const _regExpParam = str => ({ $regex: `.*${str}.*` })
const _unique = (array) => array.filter((value, index, self) => self.indexOf(value) === index)

const _getGames = (db, cursor, page, response) => {
	const skip = page * ITEMS_PER_PAGE
	cursor.skip(skip).limit(ITEMS_PER_PAGE).sort(sortCriteria).toArray((err, docs) => {
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
						genres = [...genres, ...d.genres]
					}
					if (genres.length) {
						const genresCondition = { _id: { $in: _unique(genres) }}
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
	},

	singleInfo: (db, response, id) => {
		const oId = require('mongodb').ObjectId
		const isIdValid = /[a-f0-9]{24}/.test(id)
		if (!isIdValid) {
			response.status(500).json({ error: 'Invalid ID' })
		} else {
			const condition = { _id: new oId(id) }
			db.collection('games').findOne(condition, { _id: 0 }).then((doc, error) => {
				if (error) {
					response.status(500).json({ error: error, errorType: 'main' })
				} else {
					doc = doc || {}
					let promises = []
					if (doc.series) {
						const seriesConditions = doc.series.map(series => ({ _id: series }))
						promises.push(db.collection('series').find({ $or: seriesConditions }).toArray())
					} else {
						promises.push([])
					}
					if (doc.addOns) {
						const addOnsConditions = doc.addOns.map(addOns => ({ _id: addOns }))
						promises.push(db.collection('addons').find({ $or: addOnsConditions }).toArray())
					} else {
						promises.push([])
					}
					if (doc.genres) {
						const genresConditions = doc.genres.map(genres => ({ _id: genres }))
						promises.push(db.collection('genres').find({ $or: genresConditions }).toArray())
					} else {
						promises.push([])
					}
					const aggregationParams = [
						{ $match: { game: new oId(id) } },
						{ $group: { _id: null, averageScore: { $avg: "$score" }, timesReviewed: { $sum: 1 } } },
					]
					promises.push(db.collection('reviews').aggregate(aggregationParams).toArray())

					Promise.all(promises).then(results => {
						let counter;
						let series = {}
						for (s of results[0]) {
							series[s._id] = s.title
						}
						if (doc.series) {
							counter = 0
							for (seriesOnGame of doc.series) {
								doc.series[counter] = series[seriesOnGame]
								counter++
							}
						}
						let addOns = {}
						for (a of results[1]) {
							addOns[a._id] = { title: a.title, type: a.type }
						}
						if (doc.addOns) {
							counter = 0
							for (addOnsOnGame of doc.addOns) {
								doc.addOns[counter] = addOns[addOnsOnGame]
								counter++
							}
						}
						let genres = {}
						for (g of results[2]) {
							genres[g._id] = { title: g.title, super: g.super }
						}
						if (doc.genres) {
							counter = 0
							for (genresOnGame of doc.genres) {
								doc.genres[counter] = genres[genresOnGame]
								counter++
							}
						}
						if (results[3].length && results[3][0]) {
							delete results[3][0]._id
							doc.userReviews = results[3][0]
						}
						response.json(doc)
					}).catch(errorCompl => {
						response.status(500).json({ error: errorCompl, errorType: 'complimentary' })
					})
				}
			})
		}
	}

}

module.exports = games

