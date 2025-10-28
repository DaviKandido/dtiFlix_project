const HttpResponse = require("../utils/response.util");
const wrapAsync = require("../utils/wrapAsync.util");
const reviewService = require("../services/review.service");

// CRUD
const findAll = wrapAsync(async (req, res) => {
  const movies = await reviewService.findAll(req.filter);
  HttpResponse.ok(res, movies);
})

const findOne = wrapAsync(async (req, res) => {
  const movie = await reviewService.findOne(req.filter);
  HttpResponse.ok(res, movie);
})

const findById = wrapAsync(async (req, res) => {
  const movie = await reviewService.findById(req.params.id);
  HttpResponse.ok(res, movie);
})

const create = wrapAsync(async (req, res) => {
  const movie = await reviewService.create(req.body);
  HttpResponse.created(res, movie);
})

const update = wrapAsync(async (req, res) => {
  const movie = await reviewService.update(req.params.id, req.body);
  HttpResponse.updated(res, movie);
})

const destroy = wrapAsync(async (req, res) => {
  const movie = await reviewService.delete(req.params.id);
  HttpResponse.deleted(res, movie);
})

const destroyAll = wrapAsync(async (req, res) => {
  const movies = await reviewService.deleteAll(req.filter);
  HttpResponse.deleted(res, movies);
})

// Especificos
const findMovieReviews = wrapAsync(async (req, res) => {
  const movie = await reviewService.findMovieReviews(req.params.movieId);
  HttpResponse.ok(res, movie);
})

const findTopRated = wrapAsync(async (req, res) => {
  const movie = await reviewService.findTopRated(req.filter);
  HttpResponse.ok(res, movie);
})

module.exports = {
  findAll,
  findOne,
  findById,
  create,
  update,
  destroy,
  destroyAll,
  findMovieReviews,
  findTopRated,
}