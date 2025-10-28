const movieService = require("../services/movie.service")
const HttpResponse = require("../utils/response.util");
const wrapAsync = require("../utils/wrapAsync.util");

const findAll = wrapAsync(async (req, res) => {
  const movies = await movieService.findAll(req.filter);
  HttpResponse.ok(res, movies);
})

const getOneByImdbID = wrapAsync(async (req, res) => {
  const movie = await movieService.findOneByImdbID(req.params.imdbID, req.params.queryTerm);
  HttpResponse.ok(res, movie);
})

const findOne = wrapAsync(async (req, res) => {
  const movie = await movieService.findOne(req.filter);
  HttpResponse.ok(res, movie);
})

const findById = wrapAsync(async (req, res) => {
  const movie = await movieService.findById(req.params.id);
  HttpResponse.ok(res, movie);
})

const create = wrapAsync(async (req, res) => {
  const movie = await movieService.create(req.body);
  HttpResponse.created(res, movie);
})

const update = wrapAsync(async (req, res) => {
  const movie = await movieService.update(req.params.id, req.body);
  HttpResponse.updated(res, movie);
})

const destroy = wrapAsync(async (req, res) => {
  const movie = await movieService.delete(req.params.id);
  HttpResponse.deleted(res, movie);
})

const getByTitle = wrapAsync(async (req, res) => {
  const movies = await movieService.getByTitle(req.params.title);
  HttpResponse.ok(res, movies);
})

const getByGenre = wrapAsync(async (req, res) => {
  const movies = await movieService.getByGenre(req.params.genre);
  HttpResponse.ok(res, movies);
})

const getByYear = wrapAsync(async (req, res) => {
  const movies = await movieService.getByYear(Number(req.params.year));
  HttpResponse.ok(res, movies);
})

const getByDecade = wrapAsync(async (req, res) => {
  const movies = await movieService.getByDecade(Number(req.params.decade));
  HttpResponse.ok(res, movies);
})


module.exports = {
  findAll,
  getOneByImdbID,
  findOne,
  findById,
  create,
  update,
  destroy,
  getByTitle,
  getByGenre,
  getByYear,
  getByDecade
}


