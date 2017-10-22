//Merchandise
module.exports = function(sequelize, DataTypes){
return sequelize.define('merchandise', {
	sku: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cost: {
		type: DataTypes.FLOAT,
		defaultValue: 0.0,
		validate: {
			isFloat: true,
			max: 999999,
			min: 0
		}
	},
	price: {
		type: DataTypes.FLOAT,
		defaultValue: 0.0,
		validate: {
			isFloat: true,
			max: 999999,
			min: 0
		}
	},
	wholesaleprice: {
		type: DataTypes.FLOAT,
		defaultValue: 0.0,
		validate: {
			isFloat: true,
			max: 999999,
			min: 0
		}
	},
	prodinfo: {
		type: DataTypes.STRING,
		allowNull: true
	},
	inventory: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		validate: {
          isInt: true,
          max: 9999999,
          min: 0
		}
	},
	listOrder: {
		type: DataTypes.INTEGER,
		allowNull: true
	}
});
};