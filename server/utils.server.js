const express = require('express')

const app = express()
const connection = app.get('connection')

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
			db.close()
			throw new ConnectionException(error)
		} else {
			res.status(500).json(error)
			db.close()
			throw new ConnectionException(error)
		}
	}
}

const getMongoUrl = (local = false) => {
	const localUrl = 'mongodb://localhost:27017/local'
	if (local) {
		return localUrl
	}
	const url = process.env.CONNECTION
	return url || localUrl
}

const ConnectionException = message => {
	this.message = message
	this.name = 'ConnectionException'
}

module.exports = { gameIdIsValid, connect, issueToClient }
