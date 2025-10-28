'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.Movie, { foreignKey: 'movie_id' });
    }
  }
  Favorite.init({
    movie_id: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Favorite',
  });
  return Favorite;
};
