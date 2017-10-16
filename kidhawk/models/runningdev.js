//xoemail
module.exports = function(sequelize, DataTypes){
return sequelize.define('runningdev', {
	imei: {
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
	watchStatus:{
		type: DataTypes.INTEGER,  //0 => OFF, 1=>active, 2=>VeryActive
		allowNull: false,
		defaultValue: 0
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