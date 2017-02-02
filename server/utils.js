

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

// collection wrapper
const find = (db, response, collection, criteria = {}, projection = {}) => {
    return new Promise((resolve, reject) => {
        db.collection(collection, collectionOutputError).find(criteria, projection).toArray((error, docs) => {
            if (error) {
                outputJsonError(response, 'CollFind', error, { collection, criteria, projection });
                reject();
            } else {
                resolve(docs);
            }
        });
    });
};

module.exports = { outputJsonError, collectionOutputError, find };