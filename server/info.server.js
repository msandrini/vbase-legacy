const path = require("path");
const fs = require('fs');

const singleInfo = (db, type, key) => {
	const condition = { _id: key }
	const typeWhitelist = ['addon', 'genre', 'series', 'company']
	return new Promise((resolve, reject) => {
		if (typeWhitelist.includes(type)) {
			let dbName, queryOperation;
			if (type !== 'company') {
				if (type !== 'series') {
					dbName = type + 's'
				} else {
					dbName = type
				}
			} else {
				dbName = 'companies'
			}
			db.collection(dbName).findOne(condition, { _id: 0 }).then((doc, error) => {
				if (error) {
					reject(error)
				} else {
					if (!doc) {
						reject(404)
					}
					const imgPath = `../static/images/${dbName}/${key}/1.png`
					doc.imageExists = fs.existsSync(path.join(__dirname, imgPath))
					resolve(doc)
				}
			}).catch(error => {
				reject(error)
			})
		} else {
			reject(new Error(`${type} not whitelisted`))
		}
	})

}

module.exports = singleInfo

