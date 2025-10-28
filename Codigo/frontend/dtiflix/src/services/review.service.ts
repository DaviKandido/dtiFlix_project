import { api } from "./api.service";
import { Review } from "../@types/review";

export const ReviewService = {
  getAll: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get<Review[]>("/reviews", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Review>(`/reviews/${id}`);
    return data;
  },

  getByMovieId: async (
    movieId: number,
    options?: Record<string, any> | Object,
  ) => {
    const { data } = await api.get<Review[]>(`/movies/${movieId}/reviews`, {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getTopRated: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get<Review[]>("/reviews/top-rated", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  create: async (review: Omit<Review, "id">) => {
    const { data } = await api.post<Review>("/reviews", review);
    return data;
  },

  update: async (id: number, review: Partial<Review>) => {
    const { data } = await api.put<Review>(`/reviews/${id}`, review);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
  },

  deleteAll: async (options?: Record<string, any> | Object) => {
    const { data } = await api.delete("/reviews", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },
};

export default ReviewService;
