import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const age = movie.adult ? "over18" : "under18";
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : 'Unknown';
    });

    return genreNameList;
  };

  const gotoDetail = () => {
    navigate(`/movies/${movie.id}`); // 올바른 URL 형식으로 네비게이션
  };

  return (
    <div
      style={{
        backgroundImage: "url(" + `https://image.tmdb.org/t/p/original${movie.poster_path}` + ")",
      }}
      className="movie-card"
      onClick={gotoDetail}
    >
      <div className="overlay">
        <h2>{movie.title}</h2>
        <div className="overlay-details">
          {showGenre(movie.genre_ids).map((name, index) => (
            <Badge key={index} bg="danger">{name}</Badge>
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
