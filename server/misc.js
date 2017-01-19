const misc = {

    index: (collection, response, xtra) => {
        response.status(404).json({ notFound: true });
    }

};

module.exports = misc;
