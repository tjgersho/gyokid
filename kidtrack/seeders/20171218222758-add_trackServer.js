'use strict';
var db = require('../server/util/db.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

      */

     return db.admin.create({keyname: 'trackServer', valuestring: ''}).then(function(admintoken){
		console.log(admintoken);
       },function(err){
		console.log('ERRROR in seed');
	});

    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
