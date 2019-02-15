const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

dotenv.load()

const gameIdIsValid = id => /[a-z0-9-]+/.test(String(id))

const connect = () => {
	const mongo = require('mongodb').MongoClient
	return new Promise((resolve, reject) => {
		const mongoUrl = getMongoUrl()
		mongo.connect(mongoUrl, null, (error, db) => {
			if (error) {
				if (db) db.close()
				reject(error, 'DBConn')
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
			if (db) db.close()
			throw new ConnectionException(error)
		} else {
			res.status(500).json(error)
			if (db) db.close()
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

const connectCatcher = (res, error) => {
	res.status(500).json({ error })
}

const updateAccessCounter = (type = 'index') => {
	const filePath = path.join(__dirname, `logs/${type}-counter.txt`)
	return new Promise((resolve) => {
		fs.readFile(filePath, 'utf8', (error, data) => {
			if (error) {
				fs.writeFile(filePath, '1', () => { resolve(1) })
			} else {
				const oldCounter = parseInt(data, 10)
				const newCounter = oldCounter + 1
				fs.writeFile(filePath, String(newCounter), () => { resolve(newCounter) })
			}
		})
	})
}
const logAcessedGame = (game) => {
	const filePath = path.join(__dirname, `logs/acessed-games.txt`)
	return new Promise((resolve) => {
		fs.readFile(filePath, 'utf8', (error) => {
			if (error) {
				fs.writeFile(filePath, game, () => { resolve() })
			} else {
				fs.appendFile(filePath, `\n${game}`, () => { resolve() })
			}
		})
	})
}

module.exports = {
	gameIdIsValid,
	connect,
	issueToClient,
	connectCatcher,
	updateAccessCounter,
	logAcessedGame
}
