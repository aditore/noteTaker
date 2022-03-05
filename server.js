const express = require('express');
//path is within node
const path = require('path');
const fs = require('fs');
//get route
const gP = require('./routes/gP');

//require express/ port for heroku
const app = express();
const PORT = process.env.PORT || 3002;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', gP);

app.use(express.static('public'));

//load into index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//path to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});



//server listening
app.listen(PORT, (err) => {
    if(err) {
        throw(err);
    }
    console.log(`APP listening on PORT ${PORT}`);
});