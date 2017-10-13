// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var db = require('./server/util/db.js');

var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var moment = require("moment");

// Get our API routes




const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// dynamically include routes (Controller)
fs.readdirSync('./server/routes').forEach(function (file) {
 console.log(file);

 if(file.substr(-3) == '.js') {
        const api = require('./server/routes/' + file);
	app.use('/api/v1',   api);
 }
});


// Set our api routes
//app.use('/api', api);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
//const port = process.env.PORT || '3000';
const port = 8080;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */




 db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync({force:true}).then(function() { 
    server.listen(port, () => console.log(`API running on localhost:${port}`));
});



