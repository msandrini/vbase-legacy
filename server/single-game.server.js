const { gameIdIsValid } = require('./utils.server')

const singleInfo = (db, response, id) => {
    if (!gameIdIsValid(id)) {
        response.status(500).json({ error: 'Invalid ID' })
    } else {
        const condition = { _id: id }
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
                if (doc.companies && doc.companies.length) {
                    const companiesConditions = doc.companies.map(companies => ({ _id: companies }))
                    promises.push(db.collection('companies').find({ $or: companiesConditions }).toArray())
                } else {
                    promises.push([])
                }
                const aggregationParams = [
                    { $match: { game: id } },
                    { $group: { _id: null, averageScore: { $avg: "$score" }, timesReviewed: { $sum: 1 } } },
                ]
                promises.push(db.collection('reviews').aggregate(aggregationParams).toArray())

                Promise.all(promises).then(results => {
                    let counter;
                    let series = {}
                    for (s of results[0]) {
                        series[s._id] = { title: s.title, id: s._id }
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
                        addOns[a._id] = { title: a.title, type: a.type, id: a._id }
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
                        genres[g._id] = { title: g.title, super: g.super, id: g._id }
                    }
                    if (doc.genres) {
                        counter = 0
                        for (genresOnGame of doc.genres) {
                            doc.genres[counter] = genres[genresOnGame]
                            counter++
                        }
                    }
                    let companies = {}
                    for (c of results[3]) {
                        companies[c._id] = { title: c.name, id: c._id }
                    }
                    if (doc.companies) {
                        counter = 0
                        for (companiesOnGame of doc.companies) {
                            doc.companies[counter] = companies[companiesOnGame]
                            counter++
                        }
                    }
                    if (results[4].length && results[4][0]) {
                        delete results[4][0]._id
                        doc.userReviews = results[4][0]
                    }
                    response.json(doc)
                }).catch(errorCompl => {
                    response.status(500).json({ error: errorCompl, errorType: 'complimentary' })
                })
            }
        })
    }
}

module.exports = singleInfo

