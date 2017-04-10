const assets = require('./assets.server')
const locale = require('locale')
const games = require('./games.server')
const singleGame = require('./single-game.server')
// const index = require('./index.server')
const info = require('./info.server')
const contact = require('./contact.server')
const user = require('./user.server')
const reviews = require('./reviews.server')
const sitemap = require('./sitemap.server')
const ops = require('./ops.server')
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
		.get('/locale', (req, res) => res.json({ lang: _getLocale(req.headers) }))

		/* index pages (returns index.html) */

		/*
		 MOVED TO NGINX FOR BETTER PERFORMANCE
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
		*/

		/* assets */

		/*
		 MOVED TO NGINX FOR BETTER PERFORMANCE
		.get('/jsbundles/:file', (req, res) => assets.jsbundles(res, req.params.file))
		.get('/image-gameplay/:code.:count.png', (req, res) => assets.images.gameplay.file(res, req.params.code, req.params.count))
		.get('/image-info/:type/:code.png', (req, res) => assets.images.other.file(res, req.params.type, req.params.code))
		.get('/icon/:type', (req, res) => assets.icons(res, req.params.type))
		*/
		.get('/images-gameplay/:code', (req, res) => assets.images.gameplay.list(res, req.params.code))

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

		/* user review */

		.get('/user-reviews/:game', (req, res) => connect().then(db => {
			reviews.list(db, req.params.game).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))
		.post('/review', (req, res) => connect().then(db => {
			reviews.insert(db, req.body, req.session).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))

		/* user login */

		.post('/user', (req, res) => connect().then(db => {
			user.login(db, req.body, req.session).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))
		.get('/user', (req, res) => user.check(res, req.session))
		.delete('/user', (req, res) => user.logout(res, req.session))

		/* contact */

		.post('//contact', (req, res) => connect().then(db => {
			contact(db, req.body).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))

		/* sitemap generator */

		.get('/sitemap-generate', (req, res) => connect().then(db => {
			sitemap(db).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))
		// .get('/sitemap.xml', (req, res) => assets.sitemap(res))

		/* maintenance */

		.get('/ops', (req, res) => connect().then(db => {
			ops(db).then(v => send(db, res, v)).catch(e => fail(db, res, e))
		}))

		/* default route */

		.get('*', (req, res) => defaultRoute(res))

}

module.exports = routing

