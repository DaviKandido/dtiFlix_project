const z = require('zod');

const movieBaseSchema = {
  imdbID: z.string().min(2, 'imdbID inválido'),
  title: z.string().min(1, 'Título é obrigatório'),
  year: z.number().int().positive().optional(),
  decade: z.number().int().optional(),
  plot: z.string().optional(),
  genre: z.string().optional(),
  rated: z.string().optional(),
  runtime: z.string().optional(),
  director: z.string().optional(),
  actors: z.string().optional(),
  poster: z.string().url().optional(),
  imdbRating: z.number().min(0).max(10).optional(),
  ratings: z.any().optional(),
  type: z.string().optional(),
};

const createMovieSchema = z.object(movieBaseSchema);
const updateMovieSchema = z.object(movieBaseSchema).partial();

module.exports = {
  createMovieSchema,
  updateMovieSchema,
};
