const path = require('path')
const fs = require('fs')
const { updateAccessCounter } = require('./utils.server')

const getDBNameFromType = (type) => {
	const typeWhitelist = ['addon', 'genre', 'series', 'company']
	if (typeWhitelist.includes(type)) {
		if (type !== 'company') {
			if (type !== 'series') {
				return type + 's'
			}
			return type
		}
		return 'companies'
	}
	return null
}

const singleInfo = (db, type, key) => {
	const condition = { _id: key }
	const dbName = getDBNameFromType(type)
	return new Promise((resolve, reject) => {
		if (dbName) {
			db.collection(dbName).findOne(condition, { _id: 0 }).then((doc, error) => {
				if (error) {
					reject(error)
				} else {
					if (!doc) {
						reject(new Error('404 Error'))
					}
					updateAccessCounter('info')
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
