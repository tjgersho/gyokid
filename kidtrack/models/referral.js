//ProdDesc
module.exports = function(sequelize, DataTypes){
return sequelize.define('referral', {
	origUserId: {
	 type: DataTypes.INTEGER
	},
	newUserId: {
	 type: DataTypes.INTEGER
	},
	newUserEmailValidated: {
 		type: DataTypes.BOOLEAN,
		 allowNull: false,
		 defaultValue: false
	}
});
};