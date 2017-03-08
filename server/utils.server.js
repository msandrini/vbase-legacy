const outputFile404 = (response) => {
    response.sendStatus(404);
}

const outputJsonError = (responseObj, location, error, args = {}) => {
    responseObj.status(500).json({
        error: { loc: location, args: args, content: error }
    });
};

const collectionOutputError = (error, coll) => {
    if (error) {
        outputJsonError(response, 'CollConn', error, { collection });
    }
};

const gameIdIsValid = id => /[a-z0-9\-]+/.test(String(id))

module.exports = { outputFile404, outputJsonError, collectionOutputError, gameIdIsValid };