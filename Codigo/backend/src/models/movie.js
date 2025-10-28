'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.hasMany(models.Favorite, { foreignKey: 'movie_id' });
      Movie.hasMany(models.Review, { foreignKey: 'movie_id' });
      Movie.hasMany(models.SearchHistory, { foreignKey: 'movie_id' });
    }
  }
  Movie.init({
    imdbID: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    decade: DataTypes.INTEGER,
    plot: DataTypes.TEXT,
    genre: DataTypes.STRING,
    rated: DataTypes.STRING,
    runtime: DataTypes.STRING,
    director: DataTypes.STRING,
    actors: DataTypes.STRING,
    poster: DataTypes.STRING,
    imdbRating: DataTypes.DECIMAL,
    ratings: DataTypes.JSON,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};