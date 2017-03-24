const fs = require('fs')

const gameIdIsValid = id => /[a-z0-9\-]+/.test(String(id))

const connect = () => {
	const mongo = require('mongodb').MongoClient
	return new Promise((resolve, reject) => {
		mongo.connect(mongoUrl, null, (error, db) => {
			if (error) {
				db.close()
				reject(connection.res, 'DBConn')
			} else {
				resolve(db)
			}
		})
	})
}

const issueToClient = {
	send: (db, res, values) => {
		res.json(values)
		db.close()
	},
	fail: (db, res, error) => {
		if (typeof error === 'number') {
			res.sendStatus(error)
		} else {
			res.status(500).json(error)
		}
		db.close()
	}
}

const getMongoUrl = (local = false) => {
	if (local) {
		return 'mongodb://localhost:27017/local'
	}
	/**
	 * This is intended
	 */
	const url = fs.readFileSync(path.join(__dirname, '../.connection'))
	return url
}

module.exports = { gameIdIsValid, connect, issueToClient };