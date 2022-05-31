var express = require('express');
var path = require('path');
var router = require('./src/router');

const app = express();

const pathToIndex = path.resolve(__dirname, '../client/index.html' );

app.use('/', router);
// add middleware for serving static files to express app
app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use('/*', (request, response)=>{
  response.sendFile(pathToIndex);
});


module.exports = app;