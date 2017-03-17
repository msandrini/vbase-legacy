const express = require('express')
const https = require('https')
const { outputJsonError, setServer } = require('./server/utils.server')
const routing = require('./server/routes.server')
const bodyParser = require('body-parser')
const pem = require('pem')
const sessions = require('client-sessions')

const app = express()

// sets port
app.set('port', (process.env.PORT || 5000))

// initialize bodyParser to interpret POST values
app.use(bodyParser.json())

// initialize sessions
const day = 24 * 60 * 60 * 1000
app.use(sessions({
	cookieName: 'session',
	secret: 'machinaisthegreatestalbumever',
	duration: 10 * day,
	activeDuration: day
}));

// connect to DB and then continue to routing
routing(app)

// final listener (https)
pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
	const params = {
		key: keys.serviceKey,
		cert: keys.certificate
	}
	https.createServer(params, app).listen(app.get('port'), () => {
		console.log('Node app is running HTTPS on port ' + app.get('port'))
	})
})

