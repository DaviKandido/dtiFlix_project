const { z } = require('zod');

const reviewBaseSchema = {
  movie_id: z.number().int().positive('movie_id inválido'),
  rating: z.coerce.number().min(0).max(10),
  comment: z.string().max(500).optional(),
};

const createReviewSchema = z.object(reviewBaseSchema);
const updateReviewSchema = z.object(reviewBaseSchema).partial();

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};
