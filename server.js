const express = require('express');
const { outputJsonError } = require('./server/utils');
const routing = require('./server/routes');
const bodyParser = require('body-parser');

const app = express();

// sets port
app.set('port', (process.env.PORT || 5000));

// initialize bodyParser to interpret POST values
app.use(bodyParser.urlencoded({extended:true}));

// connect to DB and then continue to routing
const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/local';
mongo.connect(mongoUrl, null, (error, db) => {
    if (error) {
        outputJsonError(connection.res, 'DBConn', error);
    } else {
        routing(app, db);
    }
});

// final listener
app.listen(app.get('port'), () => {
    console.log('Node app is running on port ' + app.get('port'));
});