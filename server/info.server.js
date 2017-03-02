
const singleInfo = (db, response, type, key) => {

	const condition = { _id: key }
	const typeWhitelist = ['addon', 'genre', 'series', 'company']
	if (typeWhitelist.includes(type)) {
		let dbName, queryOperation;
		if (type !== 'company') {
			if (type !== 'series'){
				dbName = type + 's'
			} else {
				dbName = type
			}
			queryOperation = db.collection(dbName).findOne(condition, { _id: 0 })
		} else {
			queryOperation = db.collection('companies').findOne(condition, { _id: 0 })
		}
		queryOperation.then((doc, error) => {
			if (error) {
				response.status(500).json({ error: error, errorType: 'main' })
			} else {
				doc = doc || {}
				response.json(doc)
			}
		}).catch(error => {
			response.status(500).json({ error: error, errorType: 'main' })
		})
	} else {
		response.status(500).json({ error: errorCompl, errorType: 'whitelist' })
	}

}

module.exports = singleInfo

