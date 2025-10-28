import CrudService from "./crud.service.ts";
import {Movie} from "../models/movie.ts";
import type { FindOptions } from "sequelize";
import { Op } from "sequelize";

class MovieService extends CrudService<Movie> {
  constructor() {
    super(Movie);
  }

  async getByTitle(title: string, options?: FindOptions) {
    return this.model.findAll({ where : { title: {[Op.iLike]: `%${title}%`}, ...options } });
  }

  async getByGenre(genre: string, options?: FindOptions) {
    return this.model.findAll({ where : { genre: {[Op.iLike]: `%${genre}%`}, ...options } });
  }

  async getByYear(year: number, options?: FindOptions) {
    return this.model.findAll({ where : { year }, order: [['year', 'DESC']], ...options });
  }

  async getByDecade(decade: number, options?: FindOptions) {
    return this.model.findAll({ where : { decade }, order: [['year', 'DESC']], ...options });
  }
}

export default new MovieService();