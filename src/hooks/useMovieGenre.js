import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useLanguage } from "./useLanguage";

const fetchMovieGenre = (language) => {
  return api.get(`/genre/movie/list?language=${language}`);
};

export const useMovieGenreQuery = () => {
  const { language } = useLanguage(); 

  return useQuery({
    queryKey: ['movie-genre', language], 
    queryFn: () => fetchMovieGenre(language), 
    select: (results) => results.data.genres,
    staleTime: 300000,
  });
};
