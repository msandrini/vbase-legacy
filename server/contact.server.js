const contact = (db, response, payload) => {
    payload.dateSent = new Date()
    db.collection('contactmessages').insertOne(payload).then((results, error) => {
        if (error) {
            response.status(500).json({ error })
        } else {
            response.status(200).json({ feedback: results.result })
        }
    });
}

module.exports = contact
