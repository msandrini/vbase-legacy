const path = require("path");
const fs = require('fs');

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
		} else {
			dbName = 'companies'
		}
		db.collection(dbName).findOne(condition, { _id: 0 }).then((doc, error) => {
			if (error) {
				response.status(500).json({ error: error, errorType: 'main' })
			} else {
				doc = doc || {}
				const imgPath = `../static/images/${dbName}/${key}/1.png`
				doc.imageExists = fs.existsSync(path.join(__dirname, imgPath))
				response.json(doc)
			}
		}).catch(error => {
			response.status(500).json({ error: error, errorType: 'main' })
		})
	} else {
		response.status(500).json({ error: `${type} not recognised`, errorType: 'whitelist' })
	}

}

module.exports = singleInfo

