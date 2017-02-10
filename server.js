const express = require('express');
const https = require('https');
const { outputJsonError, setServer } = require('./server/utils.server');
const routing = require('./server/routes.server');
const bodyParser = require('body-parser');
const pem = require('pem');
const mongo = require('mongodb').MongoClient;

const app = express();

// sets port
app.set('port', (process.env.PORT || 5000));

// initialize bodyParser to interpret POST values
app.use(bodyParser.urlencoded({ extended: true }));

// connect to DB and then continue to routing
const mongoUrl = 'mongodb://localhost:27017/local';
mongo.connect(mongoUrl, null, (error, db) => {
    if (error) {
        outputJsonError(connection.res, 'DBConn', error);
    } else {
        routing(app, db);
    }
});

// final listener
pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
	const params = {
        key: keys.serviceKey,
        cert: keys.certificate
    };
    https.createServer(params, app).listen(app.get('port'), () => {
        console.log('Node app is running HTTPS on port ' + app.get('port'));
    });
});

