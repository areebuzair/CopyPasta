const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/', (req, res) => {
    const textInput = "\n=========================================\nProblem_ID: " + (new Date().getTime()) + "\nProblem: " + req.body.textInputProblem + "\nSolution: " + req.body.textInputSolution;
    const filePath = path.join(__dirname, 'data.txt');

    // Append to file or create if it doesn't exist
    fs.appendFile(filePath, textInput + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('An error occurred while writing to the file.');
            return;
        }
        res.status(200);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
