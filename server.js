const express = require('express');
const fs = require('fs');

//require express/ port for heroku
const app = express();
const PORT = process.env.PORT || 3001;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));