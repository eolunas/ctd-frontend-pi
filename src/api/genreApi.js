import axiosInstance from "./axiosInstance";

// Obtener géneros con la opción de `topGenres` configurable
export const fetchGenres = (options = {}) =>
  axiosInstance.get("/genre", {
    params: { topGenres: options.topGenres || false },
  });

