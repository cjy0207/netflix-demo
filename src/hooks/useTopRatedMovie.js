import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useLanguage } from "./useLanguage";

const fetchTopRatedMovies = (language) => {
  return api.get(`/movie/top_rated?language=${language}`);
};

export const useTopRatedMoviesQuery = () => {
  const { language } = useLanguage(); 

  return useQuery({
    queryKey: ['movie-rated', language],
    queryFn: () => fetchTopRatedMovies(language), 
    select: (results) => results.data,
  });
};
