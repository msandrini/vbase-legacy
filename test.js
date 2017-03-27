const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')

// sets port
app.set('port', 5000)

// connect to DB and then continue to routing
app.get('/', (req, res) => {
	const url = fs.readFileSync(path.join(__dirname, '.connection'), 'utf-8')
	mongo.connect(url, null, (error, db) => {
		if (error) {
			db.close()
			console.error(connection.res)
			throw 'Connection error: ' + error
		} else {
			db.collection('games').find({}).limit(10).toArray((err, g) => { res.json({ g, err }) })
		}
	})
})

process.on('uncaughtException', function (err) {
	console.error(err);
})

app.listen(app.get('port'), () => {
	console.log('Node app is running *TEST* HTTP on port ' + app.get('port'))
})