import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useLanguage } from "./useLanguage";

const fetchUpcomingMovies = (language) => {
  return api.get(`/movie/upcoming?language=${language}`);
};

export const useUpcomingMoviesQuery = () => {
  const { language } = useLanguage(); 

  return useQuery({
    queryKey: ['movie-upcoming', language], 
    queryFn: () => fetchUpcomingMovies(language), 
    select: (results) => results.data,
  });
};
