'use strict';
var db = require('../server/util/db.js');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  
return db.user.create({username: 'admin', email: 'travis.g@paradigmmotion.com', password: '123kt321', role: 1}).then(function(usr){

		usr.setReferralToken();
		console.log(usr);
       },function(err){});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
     return db.user.destroy({where: {id: 1}});
  }
};
