const CrudService = require("./crud.service");
const models = require("../models");
const ApiError = require("../utils/errorHandler.util");
class ReviewService extends CrudService {
  constructor() {
    super(models.Review);
  }

  // Especificos
  async findMovieReviews(id) {
    const movie = await models.Movie.findByPk(id);

    if (!movie) {
      throw new ApiError(404, 'Movie not found', {
        movie_id: `Movie_id = ${id} not found`,
      });
    }

    return this.model.findAll({
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

  async findTopRated(options) {
    return this.model.findAll({ order: [['rating', 'DESC']], ...options });
  }
}

module.exports = new ReviewService();