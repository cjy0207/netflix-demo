import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useLanguage } from "./useLanguage";

const fetchSearchMovie = ({ keyword, page, language }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}&language=${language}`)
    : api.get(`/movie/popular?page=${page}&language=${language}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  const { language } = useLanguage(); 

  return useQuery({
    queryKey: ["movie-search", { keyword, page, language }],
    queryFn: () => fetchSearchMovie({ keyword, page, language }), 
    select: (results) => results.data,
  });
};
