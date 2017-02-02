const { find } = require('./utils');
const path = require("path");

const misc = {

    index: (db, response) => {
        response.status(200);
        response.set('Content-Type', 'text/html');
        response.send(`<!doctype html><html><head><title>VBase</title></head>
			<body>
				<div id="app"></div>
				<script type="text/javascript" src="assets/vendor.js"></script>
				<script type="text/javascript" src="assets/app.js"></script>
			</body></html>`);
    },

    assets: (response, file) => {
        response.status(200);
        response.sendFile(file, {root: path.join(__dirname, '../app/_bundled')});
    }
};

module.exports = misc;