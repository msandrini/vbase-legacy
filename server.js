const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ success: true });
});

app.listen(5000, () => {
    console.log('Node app is running on port 5000');
});
