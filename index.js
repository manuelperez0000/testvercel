const express = require('express');
const app = express();
const dbConnect = require('./dbConnection');

dbConnect();

app.get('/', (req, res) => {
    res.send('Welcome hello world')
})

app.get('/users/api/v1/', (req, res) => {
    res.send('/users/api/v1/')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('listening on port', PORT))