const fs = require('fs')
const path = require('path')

const gameIdIsValid = id => /[a-z0-9\-]+/.test(String(id))

const connect = () => {
	const mongo = require('mongodb').MongoClient
	return new Promise((resolve, reject) => {
		mongo.connect(getMongoUrl(), null, (error, db) => {
			if (error) {
				db.close()
				console.error(connection.res)
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
			throw new ConnectionException(error)
		} else {
			res.status(500).json(error)
			throw new ConnectionException(error)
		}
		db.close()
	}
}

const getMongoUrl = (local = false) => {
	const localUrl = 'mongodb://localhost:27017/local'
	if (local) {
		return localUrl
	}
	const url = fs.readFileSync(path.join(__dirname, '../.connection'), 'utf-8')
	fs.writeFileSync(path.join(__dirname, './whichurl'), url)
	return url ? url : localUrl
}

const ConnectionException = message => {
	this.message = message
	this.name = 'ConnectionException'
}

module.exports = { gameIdIsValid, connect, issueToClient };