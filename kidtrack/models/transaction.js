///transactionDump  MODEL

module.exports = function(sequelize, DataTypes){
var tnd = sequelize.define('transaction', {
	data: {
	  type:  DataTypes.TEXT,
	  allowNull: false
	},
	archive:{
        type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false
	}
});

return tnd;
};