const ops = (db, payload) => {
    return new Promise((resolve, reject) => {
        db.collection('series').find({ 'text.pt-br': { $ne: '' } }).toArray().then((results, error) => {
            if (error) {
                reject(error)
            } else {
                const map = results.map(r => r._id + `: ` + r.text['pt-br'])
                resolve({ feedback: map })
            }
        })
    })
}

module.exports = ops
