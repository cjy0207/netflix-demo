import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const age = movie.adult ? "over18" : "under18";

  const {data : genreData}=useMovieGenreQuery()
  console.log("gg", genreData)
  const showGenre=(genreIdList)=>{
    if(!genreData) return []
    const genreNameList=genreIdList.map((id)=>{
        const genreObj = genreData.find((genre)=>genre.id===id);
        return genreObj.name;
    })

    return genreNameList;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h2>{movie.title}</h2>
        <div className="overlay-details">
          {showGenre(movie.genre_ids).map((id) => (
            <Badge bg="danger">{id}</Badge>
          ))}
          <div className="movie-details-container">
            <div className="movie-details">
              <FontAwesomeIcon icon={faStar} className="icon" />

              {movie.vote_average}
            </div>
            <div className="movie-details">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              {movie.popularity}
            </div>
            <div className={`movie-details ${age}`}>
              {movie.adult ? "over18" : "under18"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
