const CrudService = require('./crud.service.js');
const models = require('../models');
const ApiError = require('../utils/errorHandler.util.js');
const { where } = require('sequelize');

class FavoriteService extends CrudService {
  constructor() {
    super(models.Favorite);
  }

  // @overwrite
  async create(data) {
    const movieId = typeof data === 'object' ? data.movie_id : data;

    const movieExists = await models.Movie.findByPk(movieId);
    if (!movieExists) {
      throw new ApiError(404, 'Movie not found');
    }

    const favoriteRecord = await this.model.findOne({
      where: { movie_id: movieId },
      paranoid: false,
    });
    if (favoriteRecord) {
      if (favoriteRecord.deletedAt === null) {
        throw new ApiError(409, 'Movie was already favorited', {
          movie_id: `Movie_id = ${favoriteRecord.movie_id} duplicate`,
        });
      }

      //Restoring previously deleted favorite
      await favoriteRecord.restore();
      return favoriteRecord;
    }

    const favorite = await this.model.create({ movie_id: movieId });
    return favorite;
  }
  async findById(id) {
    return this.model.findOne({
      where: {
        movie_id: id,
      },
      include: [
        {
          model: models.Movie,
        },
      ],
    });
  }

  async delete(id) {
    return this.model.destroy({
      where: { movie_id: id },
    });
  }

  async findOneByImdbID(imdbID) {
    return this.model.findOne({
      include: [
        {
          model: models.Movie,
          where: { imdbID: imdbID },
        },
      ],
    });
  }

  async findLastDate(options) {
    return this.model.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: models.Movie,
        },
      ],
      ...options,
    });
  }
}

module.exports = new FavoriteService();
