const locale = require('locale')

const assets = require('./assets.server')
const games = require('./games.server')
const singleGame = require('./single-game.server')
const info = require('./info.server')
const contact = require('./contact.server')
const reviews = require('./reviews.server')
const sitemap = require('./sitemap.server')
const index = require('./index.server')
const ops = require('./ops.server')
const { connect, connectCatcher, issueToClient: { send, fail } } = require('./utils.server')

const LANG = { EN: 'en', BR: 'pt-br' }

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
		.get('/locale', (req, res) => res.json({ lang: _getLocale(req.headers) }))

		.get('/', (req, res) => index(res, _getLocale(req.headers)))

		/* index pages (returns index.html) */

		.get('/all-games(/*)?', (req, res) => index(res, LANG.EN))
		.get('/search/*', (req, res) => index(res, LANG.EN))
		.get('/advanced-search(/*)?', (req, res) => index(res, LANG.EN))
		.get('/game/*', (req, res) => index(res, LANG.EN))
		.get('/info/*', (req, res) => index(res, LANG.EN))
		.get('/terms-privacy', (req, res) => index(res, LANG.EN))
		.get('/contact', (req, res) => index(res, LANG.EN))

		.get('/todos-os-jogos(/*)?', (req, res) => index(res, LANG.BR))
		.get('/busca/*', (req, res) => index(res, LANG.BR))
		.get('/busca-avancada(/*)?', (req, res) => index(res, LANG.BR))
		.get('/jogo/*', (req, res) => index(res, LANG.BR))
		.get('/informacao/*', (req, res) => index(res, LANG.BR))
		.get('/termos-privacidade', (req, res) => index(res, LANG.BR))
		.get('/contato', (req, res) => index(res, LANG.BR))

		/* assets */

		.get('/jsbundles/:file', (req, res) => assets.jsbundles(res, req.params.file))
		.get('/image-gameplay/:code/:count.png', (req, res) => assets.images.gameplay.file(res, req.params.code, req.params.count))
		.get('/image-info/:type/:code.png', (req, res) => assets.images.other.file(res, req.params.type, req.params.code))
		.get('/icons/:type', (req, res) => assets.images.other.icons(res, req.params.type))
		.get('/api/images-gameplay/:code', (req, res) => assets.images.gameplay.list(res, req.params.code))

		/* games list */

		.get('/api/games/all/:page', (req, res) => connect().then(db =>
			games.all(db, req.params.page).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		).catch(error => connectCatcher(res, error)))
		.get('/api/games/by-names/:name/:page', (req, res) => connect().then(db =>
			games.byNames(db, req.params.name, req.params.page).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		).catch(error => connectCatcher(res, error)))
		.post('/api/games/advanced', (req, res) => connect().then(db =>
			games.advanced(db, req.body).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		).catch(error => connectCatcher(res, error)))
		.get('/api/games/from-series/:series', (req, res) => connect().then(db =>
			games.fromSeries(db, req.params.series).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		).catch(error => connectCatcher(res, error)))

		/* single game */

		.get('/api/game-entry/:id', (req, res) => connect().then(db =>
			singleGame(db, req.params.id).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		).catch(error => connectCatcher(res, error)))

		/* info */

		.get('/api/info-entry/:type/:key', (req, res) => connect().then(db =>
			info(db, req.params.type, req.params.key).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		).catch(error => connectCatcher(res, error)))

		/* user review */

		.get('/api/user-reviews/:game', (req, res) => connect().then(db => {
			reviews.list(db, req.params.game).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}).catch(error => connectCatcher(res, error)))
		.post('/api/review', (req, res) => connect().then(db => {
			reviews.insert(db, req.body).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}).catch(error => connectCatcher(res, error)))

		/* contact */

		.post('/api/contact', (req, res) => connect().then(db => {
			contact(db, req.body).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}).catch(error => connectCatcher(res, error)))

		/* sitemap generator */

		.get('/api/sitemap-generate', (req, res) => connect().then(db => {
			sitemap(db).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}).catch(error => connectCatcher(res, error)))

		/* maintenance */

		.get('/api/ops', (req, res) => connect().then(db => {
			ops(db).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}).catch(error => connectCatcher(res, error)))

		/* default route */

		.get('*', (req, res) => defaultRoute(res))

}

module.exports = routing
