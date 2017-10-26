'use strict';
var db = require('../server/util/db.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */



  var devs = [];

        devs[0] = {imei: '123456789123456789', sim: '123123123123', interval: 30 };

    
      var result = [];

 var promises = devs.map(function(d){

   return  db.device.create(d).then(function(de){
	
      result.push({dev: de, success: true});

         }).catch(function(err){

      result.push({dev: d, success: false});
      return Promise.resolve();
      });
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
