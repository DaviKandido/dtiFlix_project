// src/services/dashboard.service.ts
import { api } from "./api.service";

export const DashboardService = {
  count: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get("/stats/count", { params: options });
    return data;
  },

  countTypes: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get("/stats/count-types", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  countGenres: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get("/stats/count-genrer", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  favoritesByDecade: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get("/stats/favorite-decade", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  reviewAverage: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get("/stats/review-media", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  yearSearch: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get("/stats/year-search", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },
};

export default DashboardService;
