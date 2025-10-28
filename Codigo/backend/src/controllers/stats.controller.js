const HttpResponse = require("../utils/response.util");
const wrapAsync = require("../utils/wrapAsync.util");
const reviewService = require("../services/stats.service");

// CRUD
const count = wrapAsync(async (req, res) => {
  const movies = await reviewService.count(req.filter);
  HttpResponse.ok(res, movies);
})
const countTypes = wrapAsync(async (req, res) => {
  const movie = await reviewService.countTypes(req.filter);
  HttpResponse.ok(res, movie);

})
const countGenrers = wrapAsync(async (req, res) => {
  const movie = await reviewService.countGenrers(req.filter);
  HttpResponse.ok(res, movie);
})

const favoritesDecades = wrapAsync(async (req, res) => {
  const movie = await reviewService.favoriteDecades(req.filter);
  HttpResponse.ok(res, movie);
})

const reviewMedia = wrapAsync(async (req, res) => {
  const movie = await reviewService.reviewMedia(req.filter);
  HttpResponse.ok(res, movie);
})

const yearsSearchs = wrapAsync(async (req, res) => {
  const movie = await reviewService.yearsSearchs(req.filter);
  HttpResponse.ok(res, movie);
})

module.exports = {
  count,
  countTypes,
  countGenrers,
  favoritesDecades,
  reviewMedia,
  yearsSearchs
}