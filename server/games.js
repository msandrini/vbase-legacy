const games = {

    test: (collection, response, xtra) => {
        collection.find('addons').then(function(docs) {
            response.json(docs);
        });
    }

};

module.exports = games;