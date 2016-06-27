'use strict';
module.exports = function(sequelize, DataTypes) {
  var lorem = sequelize.define('lorem', {
    searchterm: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.lorem.belongsToMany(models.user, {through: 'users_lorems'});
      }
    }
  });
  return lorem;
};
