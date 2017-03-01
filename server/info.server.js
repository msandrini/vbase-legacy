
const singleInfo = (db, response, type, key) => {

	const condition = { _id: key }
	const typeWhitelist = ['addons', 'genres', 'series']
	if (typeWhitelist.includes(type)) {
		db.collection(type).findOne(condition, { _id: 0 }).then((doc, error) => {
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

