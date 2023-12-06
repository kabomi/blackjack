const path = require('path');
const express = require('express');

const app = express();

if (process.env.ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const services = require('./services');
app.use('/api', services);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
