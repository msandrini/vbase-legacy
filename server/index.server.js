const path = require('path')
const fs = require('fs')

const index = (response, lang) => {
    const svg = fs.readFileSync(path.join(__dirname, '../static/images/icons.svg'))
    response.status(200).type('html').send(`<!doctype html>
    	<html>
    	<head>
    		<title>VBase</title>
    	</head>
		<body>
			<div id="app"></div>
			${svg}
			<script type="text/javascript">window.lang = '${lang}'</script>
			<script type="text/javascript" src="/jsbundles/vendor.js"></script>
			<script type="text/javascript" src="/jsbundles/app.js"></script>
			<script src="https://apis.google.com/js/platform.js?onload=googleApiLoaded" async defer></script>
		</body></html>`)
}

module.exports = index

