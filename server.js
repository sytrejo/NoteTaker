const fs = require('fs');
const path = require ('path');
const express = require('express');
const dbJson = require('./db/db.json')
const {v1 : uuidv1} = require('uuid');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    res.json(parseNotes);
});

app.post('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    req.body.id = uuidv1()
    parseNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
    res.json("You have successfully added a note!");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.delete('/api/notes/:id', (req, res) => {
    let noteIndex = dbJson.findIndex((note) => note.id == req.params.id); //find the index of a note of it has an id equal to the passed in id
    if (noteIndex) {
        dbJson.splice(noteIndex, 1);  //then take out that one note starting at that index position
        fs.writeFile('./db/db.json', JSON.stringify(dbJson), (err, data) => {
            if (err) {
                console.log('Data is : ' + data);
                throw err;
            }
        });
        return res.status(200).json('Note deleted.');
    }
    return res.status(404).json('Note not found.');
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});