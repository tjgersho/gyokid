//Transactions
module.exports = function(sequelize, DataTypes){
return sequelize.define('pingSale', {
	userId: {
		type: DataTypes.INTEGER
	}, 
	status: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		validate: {
          isInt: true,
          max: 5,
          min: 0
		}
	},
	amount: {
		type: DataTypes.FLOAT,
		defaultValue: 0.0,
		validate: {
			isFloat: true,
			max: 999999,
			min: 0
		}
	},
	transnum: {
		type: DataTypes.STRING,
		allowNull: true
	},
	cart:{
		type: DataTypes.TEXT,
		allowNull: true

	},
	verificationCode:{
		type: DataTypes.STRING,
		allowNull: true

	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: true

	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: true

	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true

	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true
	},
	archive:{
             type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false
	}

});
};