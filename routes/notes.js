const express = require('express');
const router = express.Router();
const fs = require('fs');
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fsUtils = require('../helpers/fsUtils');

// TODO DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  // TODO end delete

  // GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received`);
    fsUtils.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
    console.info(`${req.method} request received`);
    // TODO fix below - update properties
    const { title, text, note } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note,
        note_id: uuidv4(),
      };
  
      fsUtils.readAndAppend(newNote, './db/db.json');
      console.info(`Note added successfully 🚀`)
      res.json(newNote);
    } else {
      res.error('Error in adding note');
    }
  });

  module.exports = notes;