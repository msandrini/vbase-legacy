const { outputFile404 } = require('./utils.server');
const path = require("path");
const fs = require('fs');
const mongodb = require('mongodb');

const validId = (id) => mongodb.ObjectID.isValid(id);

const assets = {

    jsbundles: (response, file) => {
        const whitelist = ['vendor.js', 'app.js', 'vendor.js.map', 'app.js.map'];
        if (whitelist.includes(file)) {
            response.status(200);
            response.sendFile(file, { root: path.join(__dirname, '../app/_bundled') });
        } else {
            outputFile404(response);
        }
    },

    images: {
        gameplay: {
            file: (response, code, count) => {
                const countIsAllowed = /[0-9]{1}/.test(count);
                if (validId(code) && countIsAllowed) {
                    const imgPath = path.join(__dirname, `../static/images/games/gameplay/${code}/${count}.png`);
                    const fileExists = fs.existsSync(imgPath);
                    if (fileExists) {
                        response.status(200);
                        response.sendFile(`games/gameplay/${code}/${count}.png`, { root: path.join(__dirname, `../static/images/`) });
                    } else {
                        outputFile404(response);
                    }
                } else {
                    outputFile404(response);
                }
            },
            list: (response, code) => {
                if (validId(code)) {
                    let feedback = [];
                    let counter = 1;
                    let lastFileFound = false;
                    while (!lastFileFound) {
                        const imgPath = path.join(__dirname, `../static/images/games/gameplay/${code}/${counter}.png`);
                        const fileExists = fs.existsSync(imgPath);
                        if (fileExists) {
                            feedback.push(`${code}.${counter}`);
                            counter++;
                        } else {
                            lastFileFound = true;
                        }
                    }
                    response.json(feedback);
                } else {
                    outputFile404(response);
                }
            }
        },
        other: {
            file: (response, type, code, count) => {
                const codeIsAllowed = /[a-z0-9]+/.test(code);
                const countIsAllowed = /[0-9]{1}/.test(count);
                if (codeIsAllowed && countIsAllowed) {
                    const extensions = ['jpg', 'gif', 'png'];
                    let extensionOfFoundFile = false;
                    for (ext of extensions) {
                        if (fs.existsSync(path.join(__dirname, `../static/images/${type}/${code}/${count}.${ext}`))) {
                            extensionOfFoundFile = ext;
                        }
                    }
                    if (extensionOfFoundFile) {
                        response.status(200);
                        response.sendFile(`${type}/${code}/${count}.${extensionOfFoundFile}`, 
                            { root: path.join(__dirname, `../static/images/`) });
                    } else {
                        outputFile404(response);
                    }
                } else {
                    outputFile404(response);
                }
            },
            list: (response, type, code) => {
                const codeIsAllowed = /[a-z0-9]+/.test(code);
                if (codeIsAllowed) {
                    let feedback = [];
                    let counter = 1;
                    let lastFileFound = false;
                    while (!lastFileFound) {
                        const extensions = ['jpg', 'gif', 'png'];
                        let extensionOfFoundFile = false;
                        for (ext of extensions) {
                            if (fs.existsSync(path.join(__dirname, `../static/images/${type}/${code}/${counter}.${ext}`))) {
                                extensionOfFoundFile = true;
                            }
                        }
                        if (extensionOfFoundFile) {
                            feedback.push(`${code}.${counter}`);
                            counter++;
                        } else {
                            lastFileFound = true;
                        }
                    }
                    response.json(feedback);
                } else {
                    outputFile404(response);
                }
            }
        }
    }
};

module.exports = assets;

