const express = require('express');
//path is within node
const path = require('path');
const fs = require('fs');
const database = require('./db/db.json');

//require express/ port for heroku
const app = express();
const PORT = process.env.PORT || 3002;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api/notes', api);

app.use(express.static('public'));

//load into index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//path to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//get database of notes
app.get('/api/notes', (req, res) => {
    res.json(database);
})

//post a new note
app.post('/api/notes', (req, res) => {
    let filePath = path.join(__dirname, './db/db.json');
    let newNote = req.body;
    //push to db.json
    database.push(newNote)
    //write it in the html
    fs.writeFile(filePath, JSON.stringify(database), (err) => {
        if(err) {
            throw(err);
        }
        console.log(`New note was saved to database.`);
    });   
    //response json
    res.json(newNote);
})
//server listening
app.listen(PORT, (err) => {
    if(err) {
        throw(err);
    }
    console.log(`APP listening on PORT ${PORT}`);
});