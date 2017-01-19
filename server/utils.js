const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/local';

module.exports = {

    dbConnectionWrapper: (callback, connection, xtra) => {
        mongo.connect(mongoUrl, null, (error, db) => {
            if (error) {
                _outputJsonError(connection.res, 'DBConn', error);
            } else {
                const coll = _collectionWrapper(db, connection.res);
                callback(coll, connection.res, xtra);
            }
        });
    }

};

const _collectionWrapper = (db, response) => {
    return {
        find: (collection, criteria = {}, projection = {}) => {
            return new Promise((resolve, reject) => {
                db.collection(collection, _collectionErrorSend).find(criteria, projection).toArray((error, docs) => {
                    if (error) {
                        _outputJsonError(response, 'CollFind', error, { collection, criteria, projection });
                        reject();
                    } else {
                        resolve(docs);
                    }
                });
            });
        }
    };
};

const _collectionErrorSend = (error, coll) => {
    if (error) {
        _outputJsonError(response, 'CollConn', error, { collection });
    }
};

const _outputJsonError = (responseObj, location, error, args = {}) => {
    responseObj.status(500).json({
        error: { loc: location, args: args, content: error }
    });
}