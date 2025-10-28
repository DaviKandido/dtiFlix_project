// GET / dashboard / overview;
// GET / dashboard / favorites - by - genre;
// GET / dashboard / ratings - average;
// GET / dashboard / decade - trends;

const CrudService = require('./crud.service');
const models = require('../models');

class StatsService extends CrudService {
  constructor() {
    super(models.SearchHistory);
  }

  async count(options) {

    // Usar nesse formato possibilita uso do options no findAll
    const movies = await models.Movie.findAll({
      ...options,
      attributes: [
        [models.Sequelize.fn('COUNT', models.Sequelize.col('id')), 'count'],
      ],
      order: [['count', 'DESC']],
    })

    const pesquisas = await this.model.findAll({
      ...options,
      attributes: [
        [models.Sequelize.fn('COUNT', models.Sequelize.col('id')), 'count'],
      ],
      order: [['count', 'DESC']],
    });

    const favorites = await models.Favorite.findAll({
      ...options,
      attributes: [
        [models.Sequelize.fn('COUNT', models.Sequelize.col('id')), 'count'],
      ],
      order: [['count', 'DESC']],
    });

    const reviews = await models.Review.findAll({
      ...options,
      attributes: [
        [models.Sequelize.fn('COUNT', models.Sequelize.col('id')), 'count'],
      ],
      order: [['count', 'DESC']],
    });

    return {
      movies: movies[0].dataValues.count,
      pesquisas: pesquisas[0].dataValues.count,
      favorites: favorites[0].dataValues.count,
      reviews: reviews[0].dataValues.count,
    };
  }

  async countGenrers(options) {
    return this.model.findAll({
      ...options,
      attributes: [
        'genre',
        [models.Sequelize.fn('COUNT', models.Sequelize.col('genre')), 'count'],
      ],
      group: ['genre'],
      order: [['count', 'DESC']],
    });
  }

  async countTypes(options) {
    return this.model.findAll({
      ...options,
      attributes: [
        'type',
        [models.Sequelize.fn('COUNT', models.Sequelize.col('type')), 'count'],
      ],
      group: ['type'],
      order: [['count', 'DESC']],
    });
  }

  async favoriteDecades(options) {
    return this.model.findAll({
      ...options,
      attributes: [
        'decade',
        [models.Sequelize.fn('COUNT', models.Sequelize.col('decade')), 'count'],
      ],
      group: ['decade'],
      order: [['count', 'DESC']],
    });
  }

  async reviewMedia(options) {
    return models.Review.findAll({
      ...options,
      attributes: [
        [models.Sequelize.fn('AVG', models.Sequelize.col('rating')), 'media'],
      ],
    });
  }

  async yearsSearchs(options) {
    return this.model.findAll({
      ...options,
      attributes: [
        'year',
        [models.Sequelize.fn('COUNT', models.Sequelize.col('year')), 'count'],
      ],
      group: ['year'],
      order: [['count', 'DESC']],
    });
  }
}

module.exports = new StatsService();
