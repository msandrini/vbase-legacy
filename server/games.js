const { collectionWrapper } = require('./utils');

const games = {

    testRoute: (db, connection) => {
        const coll = collectionWrapper(db, connection.res);
        coll.find('addons').then(function(docs) {
            connection.res.json(docs);
        });
    }

};

module.exports = games;