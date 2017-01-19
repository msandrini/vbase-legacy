const users = {

    testRoute: (collection, response) => {
        collection.find('addons').then(function(docs) {
            response.json(docs);
        });
    }

};

module.exports = users;