// importing packages
const express = require('express');
const path = require('path');
// initializing app and port
const app = express();
const PORT = process.env.PORT || 3001;
// json file
const dbData = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(express.json());



// get notes and return them to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/notes.html'))
);
// get all files returned to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// get api and returning json in db.json
app.get('/api', (req, res) => res.json(dbData));

// start server on the port
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);
