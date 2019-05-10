import React from "react";
import "./Movie.css";

function Movie({ movieObject }) {
  const sinopsissize = 150;
  return (
    <div className="Movie">
      <div className="Movie__Column">
        <MoviePoster
          movieImage={movieObject.movieImage}
          movieTitle={movieObject.movieTitle}
        />
      </div>
      <div className="Movie__Column">
        <h1>{movieObject.movieTitle}</h1>
        <div className="Movie__Genres">
          {movieObject.movieGenres.map((genre, index) => (
            <MovieGenre genre={genre} key={index} genreId={index} />
          ))}
        </div>
        <div className="Movie__year__rating">
          {movieObject.movieYear} , {movieObject.movieRating}/10
        </div>
        <div className="Movie__synopsis">
          {movieObject.movieSynopsis.length > sinopsissize
            ? movieObject.movieSynopsis.substr(0, sinopsissize) || " ... "
            : movieObject.movieSynopsis}
        </div>
      </div>
    </div>
  );
}

function MoviePoster({ movieImage, movieTitle }) {
  return (
    <img
      className="Movie__Poster"
      src={movieImage}
      alt={movieTitle}
      title={movieTitle}
    />
  );
}

function MovieGenre({ genre, genreId }) {
  return (
    <span className="Movie__Genre" key={genreId}>
      {genreId === 0 ? "" : " / "}
      {genre}
    </span>
  );
}

export default Movie;
