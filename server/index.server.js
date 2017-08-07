// const path = require('path')
// const fs = require('fs')

const index = (response, lang) => {
	const langHtml = lang === 'pt-br' ? 'pt-BR' : lang
	const html = `<!doctype html><html lang="${langHtml}"><head>` +
		'<meta name="viewport" content="width=device-width, initial-scale=1">' +
		'<title>VBase</title></head><body>' +
		'<div id="app"></div>' +
		`<script type="text/javascript">window.lang = '${lang}'</script>` +
		'<script type="text/javascript" src="/jsbundles/vendor.js"></script>' +
		'<script type="text/javascript" src="/jsbundles/app.js"></script>' +
		'<script src="https://apis.google.com/js/platform.js?onload=googleApiLoaded" async defer></script>' +
		'</body></html>'
	response.status(200).type('html').send(html)
}

module.exports = index
