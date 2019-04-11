const { updateAccessCounter } = require('./utils.server')

const appleLogoSizes = [57, 114, 72, 144, 60, 120, 76, 152]
const genericLogoSizes = [196, 96, 32, 16, 128]

const metaTags = `
	<meta name="viewport" content="width=device-width, initial-scale=1">` +
	appleLogoSizes.map(size =>
		`<link rel="apple-touch-icon-precomposed" sizes="${size}x${size}" ` +
			`href="/icons/apple-touch-icon-${size}x${size}.png" />`).join('') +
	genericLogoSizes.map(size =>
		'<link rel="icon" type="image/png" href="/icons/favicon-' +
			`${size}x${size}.png" sizes="${size}x${size}" />`).join('') + `
	<link rel="icon" href="/icons/favicon-32x32.png" />
	<meta name="application-name" content="VBase" />
	<meta name="msapplication-TileColor" content="#788" />
	<meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="/icons/mstile-70x70.png" />
	<meta name="msapplication-square150x150logo" content="/icons/mstile-150x150.png" />
	<meta name="msapplication-wide310x150logo" content="/icons/mstile-310x150.png" />
	<meta name="msapplication-square310x310logo" content="/icons/mstile-310x310.png" />
	<meta property="og:site_name" content="VBase" />
	<meta property="og:url" content="https://vbase.games" />
	<meta charset="utf-8" />`

const scriptTags = lang => `
	<script type="text/javascript">window.lang = '${lang}'</script>
	<script type="text/javascript" src="/jsbundles/vendor.js"></script>
	<script type="text/javascript" src="/jsbundles/app.js"></script>`

const index = (response, lang) => {
	const langHtml = lang === 'pt-br' ? 'pt-BR' : lang
	const html = `<!doctype html><html lang="${langHtml}"><head>` + metaTags +
		'<title>VBase</title></head><body>' +
		'<div id="app"></div>' + scriptTags(lang) +
		'</body></html>'
	updateAccessCounter()
	response.status(200).type('html').send(html)
}

module.exports = index
