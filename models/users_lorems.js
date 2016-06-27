'use strict';
module.exports = function(sequelize, DataTypes) {
  var users_lorems = sequelize.define('users_lorems', {
    userId: DataTypes.INTEGER,
    loremId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users_lorems;
};