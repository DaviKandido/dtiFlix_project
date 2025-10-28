const CrudService = require('./crud.service.js');
const dotenv = require('dotenv');
const redisClient = require('../utils/redisClient.util.js');
const axios = require('axios');
const models = require('../models');
const { sequelize } = require('../models');
const searchService = require('./searchhistory.service.js');
const { Op } = require('sequelize');
dotenv.config();

class MovieService extends CrudService {
  constructor() {
    super(models.Movie);
  }

  async findOneByImdbID(imdbID, queryTerm = null) {
    const cacheKey = `movie:${imdbID}`;

    // 1º Verifica o cache
    const cachedMovie = await redisClient.get(cacheKey);
    if (cachedMovie) {
      console.log(`CACHE HIT for ${cacheKey}`);
      const parded = JSON.parse(cachedMovie);
      await searchService.registerSearchHistory(parded, queryTerm);
      return parded;
    }

    console.log(`CACHE MISS for ${cacheKey}`);
    // 2º Verifica o banco local
    const movieFromDB = await this.model.findOne({ where: { imdbID: imdbID } });
    // Verifica se o filme foi criado recentemente
    if (movieFromDB) {
      console.log(`DB HIT for ${imdbID}`);
      await searchService.registerSearchHistory(movieFromDB, queryTerm);
      await redisClient.set(cacheKey, JSON.stringify(movieFromDB.get({ plain: true })), {
        EX: 60 * 30,
      }); // 30min de expiração
      return movieFromDB;
    }

    console.log(`DB MISS for ${imdbID}`);
    // 3º Verifica na API[OMDb]
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
    );
    const movieData = response.data;
    if (!movieData || movieData.Response === 'False') return null;

    const newMovie = await this._createMovieFromApi(movieData, queryTerm);

    await redisClient.set(cacheKey, JSON.stringify(newMovie.get({ plain: true })), { EX: 60 * 30 }); // 30min de expiração

    return newMovie;
  }

  // Cria o novo filme no seu banco de dados
  async _createMovieFromApi(movieData, queryTerm) {
    return await sequelize.transaction(async (t) => {
      // Calcula a década
      const year = parseInt(movieData.Year, 10);
      const decade = Math.floor(year / 10) * 10;

      const movie = await this.model.create(
        {
          imdbID: movieData.imdbID,
          title: movieData.Title,
          year: year,
          decade: decade,
          plot: movieData.Plot,
          genre: movieData.Genre,
          rated: movieData.Rated,
          runtime: movieData.Runtime,
          director: movieData.Director,
          actors: movieData.Actors,
          poster: movieData.Poster,
          imdbRating: parseFloat(movieData.imdbRating) || 0,
          ratings: movieData.Ratings,
          type: movieData.Type,
        },
        { transaction: t }
      );
      await searchService.registerSearchHistory(movie, queryTerm, t);

      return movie;
    });
  }

  // Busca inteligente de filmes VERIFICA EXITENCIAS API -> CACHE -> DB -> API
  async getByTitle(title, options) {
    let moviesApi = [];

    const response = await axios.get(
      `http://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`
    );
    const movieData = response.data;
    if (!movieData || movieData.Response === 'False') return null;

    if (movieData.Search && movieData.Search.length > 0) {
      for (const movie of movieData.Search) {
        const newMovie = await this.findOneByImdbID(movie.imdbID, title);
        moviesApi.push(newMovie);
      }
    } else {
      // Busca no banco de forma bruca caso não encontre na API
      const moviesBD = await this.model.findAll({
        where: { title: { [Op.iLike]: `%${title}%` }, ...options },
      });
      if (moviesBD && moviesBD.length > 0) {
        await searchService.registerSearchHistory(moviesBD[0], title);
      }
      return moviesBD;
    }

    if (moviesApi.length === 0) return null;

    return moviesApi;
  }

  async getByGenre(genre, options) {
    return this.model.findAll({ where: { genre: { [Op.iLike]: `%${genre}%` }, ...options } });
  }

  async getByYear(year, options) {
    return this.model.findAll({ where: { year }, order: [['year', 'DESC']], ...options });
  }

  async getByDecade(decade, options) {
    return this.model.findAll({ where: { decade }, order: [['year', 'DESC']], ...options });
  }
}

module.exports = new MovieService();
