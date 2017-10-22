//xoemail
module.exports = function(sequelize, DataTypes){
return sequelize.define('email', {
	email: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	code: {
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