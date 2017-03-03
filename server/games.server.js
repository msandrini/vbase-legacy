const ITEMS_PER_PAGE = 20
const projectionForList = { title: 1, genres: 1, releaseIn: 1, otherNames: 1, companies: 1, editorScore: 1 }
const sortCriteria = { title: 1 }
const basicCondition = { specialStatus: { $ne: 'homebrew' } }

const _escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
const _regExpParam = str => ({ $regex: `${_escapeRegExp(str)}`, $options: 'i' })
const _unique = (array) => array.filter((value, index, self) => self.indexOf(value) === index)

const _getConditions = (data, referer) => {
	let conditions = {}
	if (data.companyid) {
		conditions.companies = _regExpParam(data.companyid)
	}
	if (data.review) {
		const matches = referer.match(/https\:\/\/[a-z0-9\:\-]+\/([a-z]{2}).*/)
		let lang = matches[1]
		if (lang === 'br') lang = 'pt-br'
		conditions[`editorReview.${lang}`] = _regExpParam(data.review)
	}
	if (data.genreid) {
		conditions.genres = _regExpParam(data.genreid)
	}
	if (data.names) {
		conditions.names = { $or: [{ title: _regExpParam(data.names) }, { 'otherNames.name': _regExpParam(data.names) }] }
	}
	if (data.seriesid) {
		conditions.series = _regExpParam(data.seriesid)
	}
	if (data.addonid) {
		conditions.addons = _regExpParam(data.addonid)
	}
	if (data.scores && (data.scores.from || data.scores.to)) {
		conditions.editorScore = {}
		if (data.scores.from) {
			conditions.editorScore['$gte'] = parseFloat(data.scores.from)
		}
		if (data.scores.to) {
			conditions.editorScore['$lte'] = parseFloat(data.scores.to)
		}
	}
	if (data.sizes && (data.sizes.from || data.sizes.to)) {
		conditions.cartridgeSize = {}
		if (data.sizes.from) {
			conditions.cartridgeSize['$gte'] = parseFloat(data.sizes.from)
		}
		if (data.sizes.to) {
			conditions.cartridgeSize['$lte'] = parseFloat(data.sizes.to)
		}
	}
	if (data.years && (data.years.from || data.years.to)) {
		conditions.year = {}
		if (data.years.from) {
			conditions.year['$gte'] = parseInt(data.years.from, 10)
		}
		if (data.years.to) {
			conditions.year['$lte'] = parseInt(data.years.to, 10)
		}
	}
	return conditions
}

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
					let companies = []
					for (d of docs) {
						if (d.companies) {
							companies = [...companies, ...d.companies]
						}
					}
					if (genres.length || companies.length) {
						const genresCondition = { _id: { $in: _unique(genres) || [] } }
						const companiesCondition = { _id: { $in: _unique(companies) || [] } }
						Promise.all([
							db.collection('genres').find(genresCondition, { title: 1 }).toArray(),
							db.collection('companies').find(companiesCondition, { name: 1 }).toArray()
						]).then((results) => {
							let [docsGenre, docsCompany] = results

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

							let companiesObj = {}
							for (c of docsCompany) {
								companiesObj[c._id] = c.name
							}
							for (d of docs) {
								let companiesForThisDoc = []
								for (dg of d.companies) {
									companiesForThisDoc.push(companiesObj[dg])
								}
								d.companyNames = companiesForThisDoc
								delete d.companies
							}
							response.json({ games: docs, total: count })

						}).catch((e) => {
							response.status(500).json({ error: e, errorType: 'genre/company' })
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
		const condition = Object.assign({}, basicCondition, { series: { $in: seriesIds.split(',') } })
		const gamesCursor = db.collection('games').find(condition, { title: 1 })
		_getGames(db, gamesCursor, 0, response)
	},

	advanced: (db, response, referer, query, page = 0) => {
		const data = JSON.parse(query)
		let conditions = Object.assign({}, basicCondition, _getConditions(data, referer))
		const _doMainCall = function (conditions) {
			const gamesCursor = db.collection('games').find(conditions, projectionForList)
			_getGames(db, gamesCursor, page, response)
		}
		if (data.company) {
			db.collection('companies').find({ name: _regExpParam(data.company) }, { _id: 1 }).toArray().then(docs => {
				const companyIds = docs.map(d => d._id)
				conditions.companies = { $in: companyIds }
				_doMainCall(conditions)
			})
		} else {
			_doMainCall(conditions)
		}
	}

}

module.exports = games

