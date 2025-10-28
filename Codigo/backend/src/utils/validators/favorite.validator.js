const { z } = require('zod');

const createFavoriteSchema = z.object({
  // Use z.coerce.number() para aceitar string ou número
  movie_id: z.coerce.number().int().positive({
    message: 'movie_id deve ser um número inteiro e positivo',
  }),
});

module.exports = { createFavoriteSchema };
