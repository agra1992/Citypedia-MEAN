module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apidatas', {
		userId: {
			type: DataTypes.STRING
		},
		weatherData: {
			type: DataTypes.TEXT
		},
		yelpData: {
			type: DataTypes.TEXT
		},
		tumblrData: {
			type: DataTypes.TEXT
		},
		allTwitterData: {
			type: DataTypes.TEXT
		}
	});
};