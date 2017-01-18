const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/local';

module.exports = {

    dbConnectionWrapper: (callback, connection) => {
        mongo.connect(mongoUrl, null, (error, db) => {
            if (error) {
                connection.res.status(500).json({
                    error: { loc: 'DB', content: error }
                });
            } else {
                const coll = collectionWrapper(db, connection.res);
                callback(coll, connection.res);
            }
        });
    }

};

const collectionWrapper = (db, response) => {
    return {
        find: (collection, criteria = {}, projection = {}) => {
            return new Promise((resolve, reject) => {
                db.collection(collection, (error, coll) => {
                    if (error) {
                        response.status(500).json({
                            error: { loc: 'Collection', args: { collection }, content: error }
                        });
                        reject();
                    }
                }).find(criteria, projection).toArray((error, docs) => {
                    if (error) {
                        response.status(500).json({
                            error: { loc: 'Find', args: { collection, criteria, projection }, content: error }
                        });
                        reject();
                    } else {
                        resolve(docs);
                    }
                });
            });
        }
    };
};
