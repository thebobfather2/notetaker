const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

const notes = require('./routes/notes');
app.use('/api/notes', notes);

// GET Route for homepage
app.get('*', (req, res) => {
  console.info(`${req.method} request received for ${req.path}`);
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  console.info(`${req.method} request received for ${req.path}`);
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);