import api from "../api/axios";

export const getMovies = async () => {
  const response = await api.get("movies/");
  return response.data;
};

export default api;
