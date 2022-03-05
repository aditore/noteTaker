const gP = require('express').Router();
const path = require('path');

//get the notes list
gP.get((req, res) => {
    res.json(database);
});

//post a new note
gP.post((req, res) => {
    let filePath = path.join(__dirname, '/db/db.json');
    let newNote = req.body;

    //set max amount of notes
    let maxId = 30;

    //loop to find the max id
    // code here


    //assign id to note
    // code here

    //push to db.json

    //write file as json
    //code here
})

module.exports = gP;