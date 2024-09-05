import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useLanguage } from "./useLanguage";

const fetchPopularMovies = (language) => {
  return api.get(`/movie/popular?language=${language}`);
};

export const usePopularMoviesQuery = () => {
  const { language } = useLanguage(); 

  return useQuery({
    queryKey: ['movie-popular', language], 
    queryFn: () => fetchPopularMovies(language), 
    select: (results) => results.data,
  });
};
