'use strict';

//db.js
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

var isAmazon = process.env.USER === 'ubuntu' ? true : false;

if (!isAmazon) {
	isAmazon = process.env.LOGNAME === 'root' || process.env.LOGNAME === 'ubuntu' ? true : false;
}
console.log('Is Amazon...');
console.log(isAmazon);

var dbConnect = require('./dbConnect.js');

sequelize = new Sequelize(dbConnect.database, dbConnect.username, dbConnect.password, {
		host: dbConnect.host,
		port: dbConnect.port,
		dialect: dbConnect.dialect,
		logging: false 
});

var db = {};

////////Load Models///////////////


db.user = sequelize.import('../../models/user.js');
db.token = sequelize.import('../../models/token.js');
db.gps = sequelize.import('../../models/gps.js');
db.device = sequelize.import('../../models/device.js');
db.email = sequelize.import('../../models/email.js');

//////////////////////////////////

///////RelationShips/////////


db.user.hasMany(db.device);
db.device.belongsTo(db.user);



//////////////////////////////

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;