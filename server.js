const express = require('express');
const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/myproject';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
    mongo.connect(mongoUrl, (err, db) => {
    	const infos = db.collection('infos');
    	infos.find({}).toArray((err, docs) => {
	    	res.json({ thereIsDb: true, docs: docs });
	    	db.close();
    	});
    });
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port ' + app.get('port'));
});
