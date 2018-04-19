
const mongo = require('mongodb').MongoClient
const logger = require('mongodb').Logger
const dotenv = require('dotenv')

dotenv.load()

const url = process.env.CONNECTION
mongo.connect(url, null, (connectionError, db) => {
	logger.setLevel('info')
	if (connectionError) {
		console.error(connectionError.res)
		throw new Error('Connection error: ' + connectionError)
	} else {
		db.listCollections().toArray((errorListing, list) => {
			if (errorListing) {
				db.close()
				throw new Error('Error when listing: ' + errorListing)
			}
			console.log(list)
		})
	}
})
