//xoemail
module.exports = function(sequelize, DataTypes){
return sequelize.define('gps', {
	imei: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	lat: {
		type: DataTypes.STRING,
		allowNull: true
	},
	lon: {
		type: DataTypes.STRING,
		allowNull: true
	}

});
};