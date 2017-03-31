
const mongo = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')
const logger = require('mongodb').Logger

const url = process.env.CONNECTION
mongo.connect(url, null, (error, db) => {
	logger.setLevel('info')
	if (error) {
		db.close()
		console.error(connection.res)
		throw 'Connection error: ' + error
	} else {
		db.listCollections().toArray((err, g) => { console.log(g) })
	}
})