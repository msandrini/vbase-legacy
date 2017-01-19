const express = require('express');
const { dbConnectionWrapper } = require('./server/utils');

const app = express();

// includes main processing routines
const games = require('./server/games');
const users = require('./server/users');
const misc = require('./server/misc');

// sets port
app.set('port', (process.env.PORT || 5000));

// routes
const dbc = dbConnectionWrapper;
app
    .get('/', (req, res) => dbc(misc.index, {req, res}))
    .get('/games', (req, res) => dbc(games.test, {req, res}));

// final listener
app.listen(app.get('port'), () => {
    console.log('Node app is running on port ' + app.get('port'));
});