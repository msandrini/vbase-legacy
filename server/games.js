const games = {

    test: (collection, response) => {
        collection.find('addons').then(function(docs) {
            response.json(docs);
        });
    }

};

module.exports = games;