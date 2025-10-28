const HttpResponse = require("../utils/response.util");
const wrapAsync = require("../utils/wrapAsync.util");
const searchService = require("../services/searchhistory.service");

// CRUD
const findAll = wrapAsync(async (req, res) => {
  const movies = await searchService.findAll(req.filter);
  HttpResponse.ok(res, movies);
})

const findOne = wrapAsync(async (req, res) => {
  const movie = await searchService.findOne(req.filter);
  HttpResponse.ok(res, movie);
})

const findById = wrapAsync(async (req, res) => {
  const movie = await searchService.findById(req.params.id);
  HttpResponse.ok(res, movie);
})

const create = wrapAsync(async (req, res) => {
  const movie = await searchService.create(req.body);
  HttpResponse.created(res, movie);
})

const update = wrapAsync(async (req, res) => {
  const movie = await searchService.update(req.params.id, req.body);
  HttpResponse.updated(res, movie);
})

const destroy = wrapAsync(async (req, res) => {
  const movie = await searchService.delete(req.params.id);
  HttpResponse.deleted(res, movie);
})

const destroyAll = wrapAsync(async (req, res) => {
  const movies = await searchService.deleteAll(req.filter);
  HttpResponse.deleted(res, movies);
})



module.exports = {
  findAll,
  findOne,
  findById,
  create,
  update,
  destroy,
  destroyAll,
}