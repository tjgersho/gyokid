'use strict';
module.exports = (sequelize, DataTypes) => {
  var admin = sequelize.define('admin', {
       keyname: {

	type: DataTypes.STRING,
	allowNull: false,
	unique: true 
      },

       valuestring: {
	type: DataTypes.TEXT,
	allowNull: false
       }

 });

  return admin;
};