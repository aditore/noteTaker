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
    //add id
    //this allows for a saved note to be given an id
    let testId = 50;
    //find ids
    for(let i = 0; i < database.length; i++) {
        let noteId = database[i];

        if(noteId.id > testId) {
            testId = noteId.id;
        }
    }
    //new note id will always be one higher
    newNote.id = testId + 1;
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

//delete note
app.delete('/api/notes/:id', (req, res) => {
    let filePath = path.join(__dirname, './db/db.json');
    //request to delete note
    for(let i = 0; i < database.length; i++) {
        //if(database[i] == req.params[i]) {
            database.splice(i, 1);
            break;
        //}
    }
    //write file
    fs.writeFileSync(filePath, JSON.stringify(database), (err) => {
        if(err) {
            throw(err);
        } else {
            console.log(`Note deleted.`);
        }
    });
    //response json
    res.json(database)
})
//server listening
app.listen(PORT, (err) => {
    if(err) {
        throw(err);
    }
    console.log(`APP listening on PORT ${PORT}`);
});