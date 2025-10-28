'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SearchHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SearchHistory.belongsTo(models.Movie, { foreignKey: 'movie_id' });
    }
  }
  SearchHistory.init({
    movie_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    query: DataTypes.STRING,
    year: DataTypes.INTEGER,
    decade: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    type: DataTypes.STRING,
    searchedAt: DataTypes.DATE
  }, {
    sequelize,
    createdAt: 'searchedAt',
    updatedAt: false,
    modelName: 'SearchHistory',
  });
  return SearchHistory;
};