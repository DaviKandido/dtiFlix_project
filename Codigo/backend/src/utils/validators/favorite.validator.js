const { z } = require('zod');

const createFavoriteSchema = z.object({
  movie_id: z.coerce.number().int().positive({
    message: 'movie_id deve ser um número inteiro e positivo',
  }),
});

module.exports = { createFavoriteSchema };
