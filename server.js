// importing packages
const fs = require('fs');
const express = require('express');
const path = require('path');
// initializing app and port
const app = express();
const PORT = process.env.PORT || 3002;
// json file
const dbData = require('./db/db.json');
// middleware function
app.use(express.urlencoded({ extended: true }));
// serve static files
app.use(express.static('public'));
app.use(express.json());
// get notes and replacing them with dbData
app.get('/api/notes', (req, res) => {
    res.json(dbData.slice(1));
});

// get index.html on start
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// get notes and return them to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);
// get all files returned to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// get api and returning json in db.json
app.get('/api', (req, res) => res.json(dbData));

//create notes
function createNote(body, notesArray) {
    const note = body;
    notesArray = [];
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

// new note saved to request body, added to db.json file then returned as a new note
app.post('/api/notes', (req, res) => {
    const note = createNote(req.body, dbData);
    res.json(note);
});
// delete note function
function deleteNote(notesArray, id) {

    for (let i = 0; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();

        if (note.id == id) {
            notesArray.splice(i, 1);

            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray, null, 2))
        }
    } 
}

//delete note
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, dbData);
    res.json(true);
});

// start server on the port
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);
