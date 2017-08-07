const { gameIdIsValid } = require('./utils.server')
const path = require('path')
const fs = require('fs')

const assets = {

	sitemap: response => {
		response.status(200)
		response.sendFile('sitemap.xml', { root: path.join(__dirname, '../static') })
	},

	jsbundles: (response, file) => {
		const whitelist = ['vendor.js', 'app.js', 'vendor.js.map', 'app.js.map']
		if (whitelist.includes(file)) {
			response.status(200)
			response.sendFile(file, { root: path.join(__dirname, '../app/_bundled') })
		} else {
			response.sendStatus(404)
		}
	},

	images: {
		gameplay: {
			file: (response, code, count) => {
				const countIsAllowed = /[0-9]{1}/.test(count)
				if (gameIdIsValid(code) && countIsAllowed) {
					const imgPath = path.join(__dirname, `../static/images/games/gameplay/${code}/${count}.png`)
					const fileExists = fs.existsSync(imgPath)
					if (fileExists) {
						response.status(200)
						response.sendFile(`games/gameplay/${code}/${count}.png`, { root: path.join(__dirname, '../static/images/') })
					} else {
						if (parseInt(count, 10) === 1) {
							response.sendFile('offair.jpg', { root: path.join(__dirname, '../static/images/') })
						} else {
							response.sendStatus(404)
						}
					}
				} else {
					response.sendStatus(404)
				}
			},
			list: (response, code) => {
				if (gameIdIsValid(code)) {
					let counter = 0
					let lastFileFound = false
					while (!lastFileFound) {
						const imgPath = path.join(__dirname, `../static/images/games/gameplay/${code}/${(counter + 1)}.png`)
						const fileExists = fs.existsSync(imgPath)
						if (fileExists) {
							counter++
						} else {
							lastFileFound = true
						}
					}
					response.json({ images: counter })
				} else {
					response.sendStatus(404)
				}
			}
		},
		other: {
			file: (response, type, code) => {
				const filePath = `${type}/${code}/1.png`
				const fileExists = fs.existsSync(path.join(__dirname, `../static/images/${filePath}`))
				if (fileExists) {
					response.status(200)
					response.sendFile(filePath, { root: path.join(__dirname, `../static/images/`) })
				} else {
					response.sendStatus(404)
				}
			}
		}
	}
}

module.exports = assets
