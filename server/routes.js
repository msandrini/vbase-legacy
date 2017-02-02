const games = require('./games');
const users = require('./users');
const misc = require('./misc');

const routing = (app, db) => {
	app
	    .get('/', (req, res) => misc.index(db, res))
	    .get('/assets/:file', (req, res) => misc.assets(res, req.params.file))

	    .get('/games', (req, res) => games.test(db, res))
	;
};

module.exports = routing;

