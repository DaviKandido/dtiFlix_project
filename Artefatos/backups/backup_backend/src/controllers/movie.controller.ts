import movieService from "../services/movie.service.ts"
import express from 'express';
import type { Request, Response } from 'express';
import HttpResponse from "../utils/response.util.ts";
import wrapAsync from "../utils/wrapAsync.util.ts";

const findAll = wrapAsync(async (req: Request, res: Response) => {
  const movies = await movieService.findAll(req.filterOptions || {});
  HttpResponse.ok(res, movies);
})

const findOne = wrapAsync(async (req: Request, res: Response) => {
  const movie = await movieService.findOne(req.filterOptions);
  HttpResponse.ok(res, movie);
})

const findById = wrapAsync(async (req: Request, res: Response) => {
  const movie = await movieService.findById(req.params.id);
  HttpResponse.ok(res, movie);
})

const create = wrapAsync(async (req: Request, res: Response) => {
  const movie = await movieService.create(req.body);
  HttpResponse.created(res, movie);
})

const update = wrapAsync(async (req: Request, res: Response) => {
  const movie = await movieService.update(req.params.id, req.body);
  HttpResponse.updated(res, movie);
})

const destroy = wrapAsync(async (req: Request, res: Response) => {
  const movie = await movieService.delete(req.params.id);
  HttpResponse.deleted(res, movie);
})

const destroyAll = wrapAsync(async (req: Request, res: Response) => {
  const movies = await movieService.deleteAll(req.filterOptions);
  HttpResponse.deleted(res, movies);
})

const getByTitle = wrapAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getByTitle(req.params.title);
  HttpResponse.ok(res, movies);
})

const getByGenre = wrapAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getByGenre(req.params.genre);
  HttpResponse.ok(res, movies);
})

const getByYear = wrapAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getByYear(Number(req.params.year));
  HttpResponse.ok(res, movies);
})

const getByDecade = wrapAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getByDecade(Number(req.params.decade));
  HttpResponse.ok(res, movies);
})


export default {
  findAll,
  findOne,
  findById,
  create,
  update,
  destroy,
  destroyAll,
  getByTitle,
  getByGenre,
  getByYear,
  getByDecade
}


