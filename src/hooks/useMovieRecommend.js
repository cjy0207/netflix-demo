import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"
import { useLanguage } from "./useLanguage";

const fetchMovieRecommend =({id}, language)=>{
   return api.get(`/movie/${id}/recommendations?language=${language}`)
}
export const useMovieRecommendQuery =({id})=>{
    const { language } = useLanguage(); 
    return useQuery ({
        queryKey: ['movie-recommend', language],
        queryFn : ()=>fetchMovieRecommend({id}, language),
        select:(results)=>results.data,
       
    })
}