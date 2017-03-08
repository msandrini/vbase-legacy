const locale = require('locale')
const games = require('./games.server')
const singleGame = require('./single-game.server')
const assets = require('./assets.server')
const index = require('./index.server')
const info = require('./info.server')
const contact = require('./contact.server')

const _getLocale = headers => {
	const supported = new locale.Locales(['en', 'pt'])
	const bestLocale = new locale.Locales(headers['accept-language']).best(supported).toString()
	if (bestLocale.substr(0,2) === 'pt') {
		return 'br'
	} else {
		return 'en'
	}
}

const routing = (app, db) => {
	app
		/*.get('/br', (req, res) => index(res, 'pt-br'))
		.get('/en', (req, res) => index(res, 'en'))*/
		.get('/', (req, res) => index(res, _getLocale(req.headers)))
		.get('/all-games(/*)?', (req, res) => index(res, 'en'))
		.get('/search/*', (req, res) => index(res, 'en'))
		.get('/advanced-search(/*)?', (req, res) => index(res, 'en'))
		.get('/game/*', (req, res) => index(res, 'en'))
		.get('/info/*', (req, res) => index(res, 'en'))
		.get('/terms-privacy', (req, res) => index(res, 'en'))
		.get('/contact', (req, res) => index(res, 'en'))

		.get('/jsbundles/:file', (req, res) => assets.jsbundles(res, req.params.file))
		.get('/images-gameplay/:code', (req, res) => assets.images.gameplay.list(res, req.params.code))
		.get('/image-gameplay/:code.:count', (req, res) => assets.images.gameplay.file(res, req.params.code, req.params.count))
		.get('/image-info/:type/:code', (req, res) => assets.images.other.file(res, req.params.type, req.params.code))

		.get('/games/all/:page', (req, res) => games.all(db, res, req.params.page))
		.get('/games/by-names/:name/:page', (req, res) => games.byNames(db, res, req.params.name, req.params.page))
		.post('/games/advanced', (req, res) => games.advanced(db, res, req.body))
		.get('/games/from-series/:series', (req, res) => games.fromSeries(db, res, req.params.series))

		.get('/game-entry/:id', (req, res) => singleGame(db, res, req.params.id))

		.get('/info-entry/:type/:key', (req, res) => info(db, res, req.params.type, req.params.key))

		.post('/send-contact', (req, res) => contact(db, res, req.body))

}

module.exports = routing

