const notes = require('express').Router();

// TODO DELETE Route for a specific tip
tips.delete('/:tip_id', (req, res) => {
    const tipId = req.params.tip_id;
    readFromFile('./db/tips.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((tip) => tip.tip_id !== tipId);
  
        // Save that array to the filesystem
        writeToFile('./db/tips.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });
  });
  // TODO end delete

  // GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route for a new UX/UI note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    // TODO fix below - update properties
    const { title, text, note } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

  module.exports = notes;