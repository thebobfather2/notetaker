const fs = require('fs');
const util = require('util');
const path = require('path');
const fileName = (path.join(__dirname, '../db/db.json'));

const readFromFile = util.promisify(fs.readFile);

// write data to JSON file
const writeToFile = (fileName, content) => {
  fs.writeFile(fileName, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${fileName}`)
  );
};

// read data from db and append some content
const readAndAppend = (content) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(fileName, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, fileName };