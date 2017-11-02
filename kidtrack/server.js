'use strict';

// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var db = require('./server/util/db.js');

var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');var moment = require("moment");
var fs = require('fs');
var moment = require("moment");

// Get our API routes


var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


function endPointUse(path, subDomain){
	
   fs.readdirSync(path).forEach(function (file) {

	 if (file.substr(-3) == '.js') {
   		 var api = require(path + file);
   		 app.use(subDomain, api);
  	}else{

		endPointUse(path  + file + '/', subDomain + '/' + file);
	}
    });

}

endPointUse('./server/routes/', '/api/v1');






// Set our api routes
//app.use('/api', api);


// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//////////////
var route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware 
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});

console.log(routes);

/**
 * Get port from environment and store in Express.
 */
//const port = process.env.PORT || '3000';
var port = 8080;

var seqopts = null

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
	if(val == 'dev'){
		port = 8090;
	}
	if(val == 'force'){
		seqopts = {force: true};
	}
});



app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

db.sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.error('Unable to connect to the database:', err);
});


console.log('Sequelize startup option');
console.log(seqopts);



db.sequelize.sync(seqopts).then(function () {
  server.listen(port, function () {
    return console.log('API running on localhost:' + port);
  });
});