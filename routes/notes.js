const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fsUtils = require('../helpers/fsUtils');

// GET Route for retrieving all the notes.
router.get('/', (req, res) => {
    console.info(`${req.method} request received`);
    // Reads the db.json file and return all saved notes as JSON.
    fsUtils.readFromFile(fsUtils.fileName)
        .then((data) => {
            res.json(JSON.parse(data));
        })
        .catch((err) => {
            console.info(err)
        })
});

// POST Route for a new note.
router.post('/', (req, res) => {
    console.info(`${req.method} request received`);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fsUtils.readAndAppend(newNote);
        console.info(`Note added successfully 🚀`)
        res.json(newNote);
    } else {
        res.status(500).json('Error in posting note');
    }
});

// DELETE Route to delete a specific note.
router.delete('/:id', (req, res) => {
    console.info(`${req.method} request received`);
    // This function blocks the rest of the code from executing until all the data is read from a file.
    let rawdata = fs.readFileSync(fsUtils.fileName)
    // Convert rawdata (in a Buffer) into JSON object.
    let parsedData = JSON.parse(rawdata);
    // Filters the array to remove the query parameter that contains the ID of the note that the user wants to delete. 
    notesArr = parsedData.filter(note => note.id != req.params.id)
    // Writes updated notes back to the file.
    fsUtils.writeToFile(fsUtils.fileName, notesArr);
    console.info(`Note deleted successfully 🚀`)
    res.json(notesArr);
})

module.exports = router;