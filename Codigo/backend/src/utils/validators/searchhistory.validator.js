const { z } = require('zod');

const createSearchHistorySchema = z.object({
  movie_id: z.number().int().positive(),
  title: z.string().min(1),
  query: z.string().min(1),
  year: z.number().int().optional(),
  decade: z.number().int().optional(),
  genre: z.string().optional(),
  type: z.string().optional(),
  searchedAt: z.date().optional(),
});

const updateSearchHistorySchema = createSearchHistorySchema.partial();

module.exports = { createSearchHistorySchema, updateSearchHistorySchema };
