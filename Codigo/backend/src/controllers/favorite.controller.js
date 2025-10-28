const favoriteService = require("../services/favorite.service")
const HttpResponse = require("../utils/response.util");
const wrapAsync = require("../utils/wrapAsync.util");


// Especificos
const findLastDate = wrapAsync(async (req, res) => {
  const movie = await favoriteService.findLastDate(req.filter);
  HttpResponse.ok(res, movie);
})

const getOneByImdbID = wrapAsync(async (req, res) => {
  const movie = await favoriteService.findOneByImdbID(req.params.imdbID);
  HttpResponse.ok(res, movie);
})


// CRUD
const findAll = wrapAsync(async (req, res) => {
  const movies = await favoriteService.findAll(req.filter);
HttpResponse.ok(res, movies);
})

const findOne = wrapAsync(async (req, res) => {
  const movie = await favoriteService.findOne(req.filter);
  HttpResponse.ok(res, movie);
})

const findById = wrapAsync(async (req, res) => {
  const movie = await favoriteService.findById(req.params.id);
    HttpResponse.ok(res, movie);
})

const create = wrapAsync(async (req, res) => {
  const movie = await favoriteService.create(req.body);
  HttpResponse.created(res, movie);
})

const update = wrapAsync(async (req, res) => {
  const movie = await favoriteService.update(req.params.id, req.body);
  HttpResponse.updated(res, movie);
})

const destroy = wrapAsync(async (req, res) => {
  const movie = await favoriteService.delete(req.params.id);
  HttpResponse.deleted(res, movie);
})

const destroyAll = wrapAsync(async (req, res) => {
  const movies = await favoriteService.deleteAll(req.filter);
  HttpResponse.deleted(res, movies);
})


module.exports = {
  findAll,
  findLastDate,
  getOneByImdbID,
  findOne,
  findById,
  create,
  update,
  destroy,
  destroyAll,
}


