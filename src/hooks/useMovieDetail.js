import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useLanguage } from "./useLanguage";

const fetchMovieDetail = ({ id, language }) => {
  return api.get(`/movie/${id}?language=${language}`); // Include language in the API call
};

export const useMovieDetailQuery = ({ id }) => {
  const { language } = useLanguage(); // Get the current language

  return useQuery({
    queryKey: ['movie-detail', id, language], // Add language to the query key
    queryFn: () => fetchMovieDetail({ id, language }),
    select: (results) => results.data,
  });
};
