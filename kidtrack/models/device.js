//xoemail
module.exports = function(sequelize, DataTypes){
return sequelize.define('device', {
	imei: {
		type: DataTypes.STRING,
		allowNull: true
	},
	sim: {
		type: DataTypes.STRING,
		allowNull: true
	},
	interval: {
		type: DataTypes.INTEGER,  
		allowNull: true
	},
	alarm:{
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	watching:{
		type: DataTypes.BOOLEAN,  
		allowNull: false,
		defaultValue: false
	},
	lastCmdTimeStamp: {
	   type: DataTypes.STRING,
		allowNull: true
	},
	lastCmdConfirmed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	lastCmd: {
		 type: DataTypes.STRING,
		allowNull: true
	}

});
};