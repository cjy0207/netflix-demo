import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVideo=({id})=>{
    return api.get(`/movie/${id}/videos`)
}

export const useMovieVideoQuery=({id})=>{
    return useQuery({
        queryKey:['movie-video'],
        queryFn:()=>fetchMovieVideo({id}),
        select:(results)=>results.data,
    })
}