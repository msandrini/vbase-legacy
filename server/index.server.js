const index = (response, lang) => {
    response.status(200);
    response.set('Content-Type', 'text/html');
    response.send(`<!doctype html>
    	<html>
    	<head>
    		<title>VBase</title>
    	</head>
		<body>
			<div id="app"></div>
			<script type="text/javascript">window.lang = '${lang}';</script>
			<script type="text/javascript" src="jsbundles/vendor.js"></script>
			<script type="text/javascript" src="jsbundles/app.js"></script>
			<script src="https://apis.google.com/js/platform.js?onload=googleApiLoaded" async defer></script>
		</body></html>`);
};

module.exports = index;

