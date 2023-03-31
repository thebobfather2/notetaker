// Packages / Dependencies.
const express = require('express');
const path = require('path');
// PORT
const PORT = process.env.PORT || 3001;
// Express function.
const app = express();

// Recognizes the incoming Request Object as a JSON Object.
app.use(express.json());
// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));
// Makes the public folder available to the client.
app.use(express.static('public'));

// Routes.
const notes = require('./routes/notes');
// Loads the router module in the app.
app.use('/api/notes', notes);

// GET Route for notes page.
app.get('/notes', (req, res) => {
    // Logs the request to the terminal.
    console.info(`${req.method} request received for ${req.path}`);
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'));
})

// GET Route for homepage / Fallback route.
app.get('*', (req, res) => {
    // Logs the request to the terminal.
    console.info(`${req.method} request received for ${req.path}`);
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Listens the PORT and starts node.
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));