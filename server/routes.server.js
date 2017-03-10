const locale = require('locale')
const games = require('./games.server')
const singleGame = require('./single-game.server')
const assets = require('./assets.server')
const index = require('./index.server')
const info = require('./info.server')
const contact = require('./contact.server')
const { connect, issueToClient: { send, fail } } = require('./utils.server')

const _getLocale = headers => {
	const supported = new locale.Locales(['en', 'pt'])
	const bestLocale = new locale.Locales(headers['accept-language']).best(supported).toString()
	if (bestLocale.substr(0, 2) === 'pt') {
		return 'br'
	} else {
		return 'en'
	}
}

const defaultRoute = res => res.sendStatus(404)

const routing = (app) => {

	app
		.get('/', (req, res) => index(res, _getLocale(req.headers)))

		/* index pages (returns index.html) */

		.get('/all-games(/*)?', (req, res) => index(res, 'en'))
		.get('/search/*', (req, res) => index(res, 'en'))
		.get('/advanced-search(/*)?', (req, res) => index(res, 'en'))
		.get('/game/*', (req, res) => index(res, 'en'))
		.get('/info/*', (req, res) => index(res, 'en'))
		.get('/terms-privacy', (req, res) => index(res, 'en'))
		.get('/contact', (req, res) => index(res, 'en'))

		.get('/todos-os-jogos(/*)?', (req, res) => index(res, 'pt-br'))
		.get('/busca/*', (req, res) => index(res, 'pt-br'))
		.get('/busca-avancada(/*)?', (req, res) => index(res, 'pt-br'))
		.get('/jogo/*', (req, res) => index(res, 'pt-br'))
		.get('/informacao/*', (req, res) => index(res, 'pt-br'))
		.get('/termos-privacidade', (req, res) => index(res, 'pt-br'))
		.get('/contato', (req, res) => index(res, 'pt-br'))

		/* assets */

		.get('/jsbundles/:file', (req, res) => assets.jsbundles(res, req.params.file))
		.get('/images-gameplay/:code', (req, res) => assets.images.gameplay.list(res, req.params.code))
		.get('/image-gameplay/:code.:count', (req, res) => assets.images.gameplay.file(res, req.params.code, req.params.count))
		.get('/image-info/:type/:code', (req, res) => assets.images.other.file(res, req.params.type, req.params.code))

		/* games list */

		.get('/games/all/:page', (req, res) => connect().then(db => 
			games.all(db, req.params.page).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		))
		.get('/games/by-names/:name/:page', (req, res) => connect().then(db => 
			games.byNames(db, req.params.name, req.params.page).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		))
		.post('/games/advanced', (req, res) => connect().then(db => 
			games.advanced(db, req.body).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		))
		.get('/games/from-series/:series', (req, res) => connect().then(db => 
			games.fromSeries(db, req.params.series).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		))

		/* single game */

		.get('/game-entry/:id', (req, res) => connect().then(db => 
			singleGame(db, req.params.id).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		))

		/* info */

		.get('/info-entry/:type/:key', (req, res) => connect().then(db => 
			info(db, req.params.type, req.params.key).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		))

		/* contact */

		.post('/send-contact', (req, res) => connect().then(db => {
			contact(db, req.body).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))

		/* default route */

		.get('*', (req, res) => defaultRoute(res))

}

module.exports = routing

