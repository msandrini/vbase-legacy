const games = require('./games.server')
const assets = require('./assets.server')
const index = require('./index.server')

const routing = (app, db) => {
	app
	    .get('/br', (req, res) => index(res, 'pt-br'))
	    .get('/en', (req, res) => index(res, 'en'))

	    .get('/jsbundles/:file', (req, res) => assets.jsbundles(res, req.params.file))
	    .get('/images-gameplay/:code', (req, res) => assets.images.gameplay.list(res, req.params.code))
	    .get('/image-gameplay/:code.:count', (req, res) => assets.images.gameplay.file(res, req.params.code, req.params.count))
	    .get('/images-other/:type/:code', (req, res) => assets.images.other.list(res, req.params.type, req.params.code))
	    .get('/image-other/:type/:code.:count', (req, res) => assets.images.other.file(res, req.params.type, req.params.code, req.params.count))

	    .get('/games/all/:page', (req, res) => games.all(db, res, req.params.page))
	    .get('/games/by-names/:name/:page', (req, res) => games.byNames(db, res, req.params.name, req.params.page))
	    .get('/games/advanced/:query/:page', (req, res) => games.advanced(db, res, req.params.query, req.params.page))

	    .get('/game/:id', (req, res) => games.all(db, res, req.params.id))

}

module.exports = routing

