const CrudService = require("./crud.service");
const models = require("../models");
const { Op } = require("sequelize");


class SearchHistoryService extends CrudService {
  constructor() {
    super(models.SearchHistory);
  } 

    async registerSearchHistory(movie, queryTerm, t = null){
      const recent = await this.model.findOne({
        where: {
          movie_id: movie.id,
          query: queryTerm || movie.title,
          searchedAt: { [Op.gte]: new Date(Date.now() - 1000 * 60) },
        },
      });
      if (recent) return; // evita duplicação
  
      await this.model.create(
        {
          movie_id: movie.id,
          title: movie.title,
          query: queryTerm || movie.title,
          year: movie.year,
          decade: movie.decade,
          genre: movie.genre,
          type: movie.type,
          searchedAt: new Date(),
        },
        { transaction: t }
      );
    }

    //@override
    async findAll(options) {
      return this.model.findAll({ order: [['searchedAt', 'DESC']], ...options });
    }

}

module.exports = new SearchHistoryService();