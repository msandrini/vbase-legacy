const express = require('express');
const { dbConnectionWrapper } = require('./server/utils');

const app = express();

// includes main processing routines
const games = require('./server/games');

// sets port
app.set('port', (process.env.PORT || 5000));

// table with route mappings that are going to be processed
const routeProcessingMapping = [
    { method: 'get', route: '/', function: games.testRoute }
];

// executing the table above
for (map of routeProcessingMapping) {
    app[map.method](map.route, (req, res) => {
        dbConnectionWrapper(map.function, {req, res});
    });
}

// final listener
app.listen(app.get('port'), () => {
    console.log('Node app is running on port ' + app.get('port'));
});