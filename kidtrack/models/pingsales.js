//Transactions
module.exports = function(sequelize, DataTypes){
return sequelize.define('pingSale', {
	userId: {
		type: DataTypes.INTEGER
	}, 
	status: {
		type: DataTypes.STRING,
		allowNull: true
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
	email: {
		type: DataTypes.STRING,
		allowNull: true

	},
	payer_id: {
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